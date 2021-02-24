// BEFORE LAUNCH
const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: 'everyone'});
const config = require('./config.json');
const fs = require('fs');
const mysql = require('mysql');

// ON READY
client.on('ready', () => {
  console.log("Newo Bot is Online");
  console.log(`Owner ID: ${config.ownerID}`);

  client.user.setActivity("Destiny 2", {url: "https://twitch.tv/newox", type: 'PLAYING'})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

  // CACHE MESSAGES
  // Scrim Messages
  client.guilds.cache.get(config.pillowsID).channels.cache.get(config.scrimChannel).messages.fetch({ limit: 10 })
  .then(messages => console.log(`Cached ${messages.size} messages in the scrim channel`))
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


// ON MESSAGE
client.on('message', async message => {

  if(message.author.bot) return;

  const xp = require(`./modules/handleXP.js`);
  xp.run(client, message, database);

  if(message.content.indexOf(config.prefix) === 0) {
    const cmd = require(`./modules/commandHandler.js`);
    cmd.run(client, message, database);
  }




});

// USER JOIN
client.on('guildMemberAdd', member => {

  const color = require(`./modules/colorGreeter.js`);
  color.run(client, message, args, database);

});

client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) return;
  const reactions = require(`./modules/reactions.js`);
  const message = reaction.message
  const emoji = reaction.emoji;
  reactions.add(client, message, user, reaction, emoji, database);
});

client.on('messageReactionRemove', (reaction, user) => {
  if (user.bot) return;
  const reactions = require(`./modules/reactions.js`);
  const message = reaction.message
  const emoji = reaction.emoji;
  reactions.remove(client, message, user, reaction, database);
});

// ERROR
client.on('error', console.error);

// LOGIN
client.login(process.env.TOKEN);
