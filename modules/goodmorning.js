const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, guild, day) => {
  guildData = config.guilds[config.guilds.map(g => g.id).indexOf(guild.id)];
  console.log(`Sending a good morning message to ${guildData.name}...`);

  const generalChannel = client.channels.cache.get(guildData.generalID);
  const message = config.goodMorningMessages[Math.floor(Math.random()*config.goodMorningMessages.length)];

  generalChannel.send(message)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
};
