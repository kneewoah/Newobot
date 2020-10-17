const config = require("../config.json");

exports.run = (client, message, args) => {

  var randomPerson = message.guild.members.random()
  message.channel.send(`${message.author} just took a fat shit on ${randomPerson}. The shit was ${Math.floor((Math.random())*20)+12} cubic centimeters. :poop:`)

};

exports.help = {
  description: "makes you shit",
  usage: "!shit"
};
