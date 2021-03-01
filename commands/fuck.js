const config = require("../config.json");

exports.run = async (client, message, args) => {

  const members = await message.guild.members.cache.filter(guildMember => !guildMember.user.bot);
  const person = members.random().user;

  message.channel.send(`${message.author} whips out his dick and fucks ${person} in the asshole. \n:peach::eggplant:`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

};

exports.help = {
  description: "makes you fuck your true love",
  usage: "!fuck"
};
