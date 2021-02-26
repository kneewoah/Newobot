const config = require("../config.json");

exports.run = (client, message, args) => {

  var person = (message.mentions.users.first()) ? message.mentions.users.first() : message.author;

  message.reply(`here is ${person.tag}'s profile picture`, {files: [person.avatarURL()]})
    .then(() => console.log(`Sent a reply to ${message.author.tag}: 'here is ${person.tag}'s profile picture: ${person.avatarURL()}'`))
    .catch(console.error);
};

exports.help = {
  description: "sends a link for someone's url",
  usage: `${config.prefix}pfp [user]`
};
