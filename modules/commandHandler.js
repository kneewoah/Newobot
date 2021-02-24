const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, args, database) => {
  if(message.content.indexOf(config.prefix) !== 0) return;

  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  var msgGuild = (!message.guild) ? "Direct Messages" : message.guild.name;

  console.log(`Attempting to process \'${command}\' sent by user \'${message.author.tag}\' in \'${msgGuild}\'...`)

  var exists = false;
  let cmdFile;
  try {
    cmdFile = require(`../commands/${command}.js`);
    exists = true;
  } catch (failure) {
    console.log(failure);
  }

  if (exists) {
    try {
      cmdFile.run(client, message, args, database);
      console.log(`Ran command \'${command}\' succesfully.`);
      message.react('☁');
    } catch (error) {
      console.log(`Could not process command \'${command}\'.`);
      console.log(error);
    }
  }
};
