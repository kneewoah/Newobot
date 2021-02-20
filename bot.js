// BEFORE LAUNCH
const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: 'everyone'});
const config = require('./config.json');
const moment = require('moment');
const fs = require('fs');
const mysql = require('mysql');

// ON READY
client.on('ready', () => {
  const owner = client.users.cache.find(user => user.id === config.ownerID)
  console.log("Newo Bot is Online.");
});

// CONNECT TO DATABASE
var database = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

database.connect(err => {
  if(err) throw err;
  console.log("Connected to database");
});

// FUNCTIONS
function generateXp() {
  var min = 15;
  var max = 25;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ON MESSAGE
client.on('message', async message => {
  if(message.author.bot) return;

  var timestamp = moment().format('HH:mm:ss');
  var unix = moment().unix();

  // XP HANDLER
  function handleXP() {
    if (message.guild.id != config.pillowsID) return;
    var table = `xp_${config.pillowsID}`;
    database.query(`SELECT * FROM ${table} WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) throw err;
    // console.log(rows);

    if(rows.length < 1) {
      var sql = `INSERT INTO ${table} (id, xp, timeStamp, progress, level) VALUES ('${message.author.id}', ${generateXp()}, ${unix}, ${genXp}, 0)`;
      console.log("NEW QUERY: " + sql);
      database.query(sql, console.log);

    } else {
      var oldTime = rows[0].timeStamp;
      var diff = (unix - oldTime);
      console.log("Diff: " + diff);

      if (diff >= 60) {
        // update params
        var xp = rows[0].xp + genXp;
        var progress = rows[0].progress + genXp;
        var level = rows[0].level;
        var thresh = 5*Math.pow(level, 2)+50*level+100;
        var sql = `UPDATE ${table} SET xp = ${xp}, timeStamp = ${unix}, progress = ${progress} WHERE id = '${message.author.id}'`;
        console.log("NEW QUERY: " + sql);
        database.query(sql, console.log);


        // check if level update
        if (progress >= thresh) {
          level++;
          progress -= thresh;
          sql2 = `UPDATE ${table} progress = ${progress}, level = ${level} WHERE id = '${message.author.id}'`;
          console.log("NEW QUERY: " + sql2);
          database.query(sql2, console.log);
          message.channel.send("Level up!"); // will make detailed later
        }
      }
    }

  });
  }

  handleXP();

  // COMMAND HANDLER
  if(message.content.indexOf(config.prefix) !== 0) return;

  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var msgGuild = (!message.guild) ? "Direct Messages" : message.guild.name;

  console.log(`${timestamp}: Attempting to process \'${command}\' sent by user \'${message.author.tag}\' in \'${msgGuild}\'...`)

  var exists = false;
  let cmdFile;
  try {
    cmdFile = require(`./commands/${command}.js`);
    exists = true;
  } catch (failure) {
    console.log(failure);
  }

  if (exists) {
    try {
      cmdFile.run(client, message, args, database);
      console.log(`${timestamp}: Ran command \'${command}\' succesfully.`);
      message.react('☁');
    } catch (error) {
      console.log(`${timestamp}: Could not process command \'${command}\'.`);
      console.log(error);
    }
  }

});

// USER JOIN
client.on('guildMemberAdd', member => {

  // COLOR GREETER
  let roleName = `${member.id}`;

  if(member.guild.roles.cache.find(role => role.name === roleName)) {
    let roleID = member.guild.roles.cache.find(role => role.name === roleName).id;
    member.roles.add(roleID);
  } else {
    let channel = member.guild.channels.cache.find(ch => ch.id === config.pillowsGeneralID || ch.id === config.testingChannelID);
    if (!channel) return;
    channel.send(`Welcome ${member.displayName}! Type \`!color #HEXCODEHERE\` to chose your role color! You can choose a color here: <https://tr.im/hexwheel>.`);
  };
});

// ERROR
client.on('error', console.error);

// LOGIN
client.login(process.env.TOKEN);
