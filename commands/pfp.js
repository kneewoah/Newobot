const config = require("../config.json");

exports.run = (client, message, args) => {

  var person = (message.mentions.users.first()) ? message.mentions.users.first() : message.author;

  message.reply(`here is ${person.tag}'s profile picture: ${person.avatarURL()}`);
};

exports.help = {
  description: "sends a link for someone's url",
  usage: "!pfp [user] (user is optional)"
};
