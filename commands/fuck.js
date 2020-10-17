const config = require("../config.json");

exports.run = (client, message, args) => {

  var randomPerson = message.guild.members.random()
  message.channel.send(`${message.author} whips out his dick and fucks ${randomPerson} in the asshole. \n:peach::eggplant:`)

};

exports.help = {
  description: "makes you fuck your true love",
  usage: "!fuck"
};
