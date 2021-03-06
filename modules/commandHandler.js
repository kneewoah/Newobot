const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, database) => {

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  console.log(`Attempting to process \'${command}\' sent by user \'${message.author.tag}\' in \'${(!message.guild) ? "Direct Messages" : message.guild.name}\'...`)

  var exists = false;
  let cmdFile;
  try {
    cmdFile = require(`../commands/${command}.js`);
    exists = true;
  } catch (failure) {
    exists = false;
    console.log(`${command} is not a command.`);
  }

  if (exists) {
    try {
      console.log(`Running command \'${command}\'.`);
      cmdFile.run(client, message, args, database);
      message.react('☁');
    } catch (error) {
      console.log(`Could not process command \'${command}\'.`);
      console.log(error);
    }
  }
};
