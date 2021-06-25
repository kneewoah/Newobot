// BEFORE LAUNCH
//const storedVars = require('./DO-NOT-PUSH.json');
const storedVars = process.env;
const Discord = require('discord.js');
const { Client, Intents} = require('discord.js');
const client = new Discord.Client({
  disableMentions: 'everyone',
  partials: ['GUILD_PRESENCES', 'GUILD_MEMBERS']
});
const config = require('./config.json');
const fs = require('fs');
const mysql = require('mysql');
var pillowsServer;
var database;

// ON READY
client.on('ready', () => {
  console.log("Newo Bot is Online");
  console.log(`Owner ID: ${config.ownerID}`);

  // CONNECT TO DATABASE
  database = mysql.createConnection({
    host: storedVars.DATABASE_HOST,
    user: storedVars.DATABASE_USER,
    password: storedVars.DATABASE_PASSWORD,
    database: storedVars.DATABASE
  });

  database.connect(err => {
    if(err) throw err;
    console.log("Connected to database");
  });

  client.user.setActivity(`bot is restarting`, {type: 'PLAYING'})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

  // CACHE MESSAGES
  pillowsServer = client.guilds.cache.get(config.guilds[0].id);

  // Scrim Messages
  pillowsServer.channels.cache.get(config.guilds[0].scrimChannel).messages.fetch({limit: 10})
  .then(messages => console.log(`Cached ${messages.size} messages in the scrim channel`))
  .catch(console.error);

  // Pillows Members
  pillowsServer.members.fetch({withPresences: true, limit: pillowsServer.memberCount})
  .then(members => console.log(`Cached ${members.size} members in the Pillows Discord`))
  .catch(console.error);

  // TIMERS
  require(`./modules/timers.js`).run(client, client.guilds.cache.get(config.guilds[0].id), database);

});

// ON MESSAGE
client.on('message', async message => {

  if(message.author.bot || message.system) return;

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

  if (member.user.bot) return;
  
  require(`./modules/handleXP.js`).new(member, database);
  const color = require(`./modules/roleColor.js`);
  const randColor = `0x${Math.floor(Math.random()*16777215).toString(16)}`
  color.run(client, database, member, randColor);
  member.guild.channels.cache.get(config.guilds[0].generalID).send(`Welcome ${member}! Type \`!color #HEXCODEHERE\` to chose your role color! You can choose a color here: <https://tr.im/hexwheel>.`)
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
client.on('presenceUpdate', (oldPresence, newPresence) => {
  // STREAMING ROLL
  if (oldPresence && oldPresence.activities !== undefined) {
    oldPresence.activities.forEach(activity => {
      if (activity.type == "STREAMING") {
          console.log(`${oldPresence.user.tag} is no longer streaming.`);
          oldPresence.member.roles.remove(oldPresence.guild.roles.cache.get(config.guilds[0].streamingRoleID), "Now Streaming")
          .then(u => console.log(`Removed roll 'STREAMING' from ${u.user.tag}.`))
          .catch(console.error);
      };
    });
  }

  if (newPresence && newPresence.activities !== undefined) {
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
            console.log(`${newPresence.user.tag} is streaming at ${activity.url}.`);
            newPresence.member.roles.add(newPresence.guild.roles.cache.get(config.guilds[0].streamingRoleID), "Now Streaming")
            .then(u => console.log(`Added role 'STREAMING' to ${u.user.tag}.`))
            .catch(console.error);
        };
    });
  }
});


// ERROR
client.on('error', console.error);

// LOGIN
client.login(storedVars.TOKEN);
