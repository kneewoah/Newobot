const config = require("../config.json");

exports.run = async (client, message, args) => {

  const members = await message.guild.members.cache.filter(guildMember => !guildMember.user.bot);
  const person = members.random().user;

  message.channel.send(`${message.author} just took a fat shit on ${person}. The shit was ${Math.floor((Math.random())*20)+12} cubic centimeters. :poop:`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

};


exports.help = {
  description: "makes you shit",
  usage: "!shit"
};
