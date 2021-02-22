const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {
  var target = message.mentions.members.first();

  for (var i = 0; i < 10; i++) {
    message.channel.send(target.toString());
  }
};

exports.help = {
  description: "spam anyone",
  usage: "!spam <user>"
};
