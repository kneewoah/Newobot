// BEFORE LAUNCH
const Discord = require('discord.js');
const { Client, Intents} = require('discord.js');
const client = new Discord.Client({
  disableMentions: 'everyone',
  partials: ['GUILD_MEMBERS']
});
const config = require('./config.json');
const fs = require('fs');
const mysql = require('mysql');

// ON READY
client.on('ready', () => {
  console.log("Newo Bot is Online");
  console.log(`Owner ID: ${config.ownerID}`);

  client.user.setActivity(`bot is restarting`, {type: 'PLAYING'})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

  // CACHE MESSAGES
  const pillowsServer = client.guilds.cache.get(config.pillowsID)

  // Scrim Messages
  pillowsServer.channels.cache.get(config.scrimChannel).messages.fetch({limit: 10})
  .then(messages => console.log(`Cached ${messages.size} messages in the scrim channel`))
  .catch(console.error);

  // Pillows Mmbers
  pillowsServer.members.fetch({limit: pillowsServer.memberCount})
  .then(members => console.log(`Cached ${members.size} members in the Pillows Discord`))
  .catch(console.error);

});

// CONNECT TO DATABASE
const database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

database.connect(err => {
  if(err) throw err;
  console.log("Connected to database");
});

// RECONNECT EVERY 5 MINUTES
setInterval(() => {
    database.query('SELECT 1');
    console.log(`Refreshing database connection`)
}, 300000);


// ON MESSAGE
client.on('message', async message => {

  if(message.author.bot) return;

  if(!message.guild) return require(`./modules/logDM.js`).run(client, message);

  const xp = require(`./modules/handleXP.js`);
  xp.text(client, message, database);

  if(message.content.indexOf(config.prefix) === 0) {
    const cmd = require(`./modules/commandHandler.js`);
    cmd.run(client, message, database);
  }

});

// USER JOINS SERVER
client.on('guildMemberAdd', member => {
  require(`./modules/handleXP.js`).new(member, database);

  const color = require(`./modules/roleColor.js`);
  const randColor = `0x${Math.floor(Math.random()*16777215).toString(16)}`
  color.run(client, database, member, randColor);
  member.guild.channels.cache.get(config.pillowsGeneralID).send(`Welcome ${member}! Type \`!color #HEXCODEHERE\` to chose your role color! You can choose a color here: <https://tr.im/hexwheel>.`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

});

// USER LEAVES SERVER
client.on('guildMemberRemove', member => {
  // Delete role color
  require(`./modules/roleColor.js`).delete(client, member, member.guild);
});

// REACTION ADD
client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) return;
  const reactions = require(`./modules/reactions.js`);
  const message = reaction.message
  const emoji = reaction.emoji;
  reactions.add(client, message, user, reaction, emoji, database);
});

// REACTION REMOVE
client.on('messageReactionRemove', (reaction, user) => {
  if (user.bot) return;
  const reactions = require(`./modules/reactions.js`);
  const message = reaction.message
  const emoji = reaction.emoji;
  reactions.remove(client, message, user, reaction, database);
});

// VOICE CHANNEL UPDATE
client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
  if (oldVoiceState.member.user.bot) return;
  require(`./modules/handleXP.js`).voice(client, oldVoiceState, newVoiceState, database);
});

// GUILDMEMBER UPDATE
client.on('guildMemberUpdate', (oldMember, newMember) => {

  // STREAMING ROLL
  oldActivities = oldMember.presence.activities;
  newActivities = newMember.presence.activities;
  for (var i = 0; i < oldActivities.length; i++) {
      if (newActivities[i].type == "STREAMING" && oldActivities[i].type !== "STREAMING") {
        newMember.roles.add(newMember.guild.roles.cache.get(config.streamingRoleID), "Now Streaming")
        .then(u => console.log(`Added role 'STREAMING' to ${u.user.tag}.`))
        .catch(console.error);
      } else if (oldActivities[i].type == "STREAMING" && newActivities[i].type !== "STREAMING") {
        newMember.roles.remove(newMember.guild.roles.cache.get(config.streamingRoleID), "Now Streaming")
        .then(u => console.log(`Removed roll 'STREAMING' from ${u.user.tag}.`))
        .catch(console.error);
      }
  }
});

// TIMERS
setInterval(() => {

  console.log(`Checking Date...`);
  var date = new Date()
  date.setTime(date.getTime() + config.timeOffset*3600000); // apply offset;
  var hour = date.getHours();
  var dayOfWeek = date.getDay();
  var dayOfMonth = date.getDate();

  console.log(`Hour: ${hour}, Day of the Week: ${dayOfWeek}, Day of the Month: ${dayOfMonth}`);

  if(dayOfMonth == 1 && hour == 0) require(`./modules/xpResets.js`).monthly(client, database);
  if(dayOfWeek == 0 && hour == 0) require(`./modules/xpResets.js`).weekly(client, database);
  if(hour == 0) require(`./modules/xpResets.js`).daily(client, database);

}, 60*60000); // (1 hour)

var minutesSinceCrash = 0;
setInterval(() => {
  minutesSinceCrash++;
  client.user.setActivity(`${minutesSinceCrash} minutes without a crash/restart!`, {type: 'PLAYING'})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

}, 60000); // (1 minute)

setInterval(() => {
  console.log(`Verifying all color roles are properly applied...`);
  const mems = client.guilds.cache.get(config.pillowsID).members.cache.filter(guildMember => !guildMember.user.bot);
  const color = require(`./modules/roleColor.js`);

  mems.forEach(member => {
    color.run(client, database, member, undefined, "Newo Bot Timer");
  });

  setTimeout(function() {
    require(`./modules/roleColor.js`).verify(client.guilds.cache.get(config.pillowsID), "Newo Bot Timer");
  }, 1000);

  console.log(`All color roles now applied correctly.`);
}, 6*60*60000); // (6 hours)




// ERROR
client.on('error', console.error);

// LOGIN
client.login(process.env.TOKEN);
