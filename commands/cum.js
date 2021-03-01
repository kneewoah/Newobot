const config = require("../config.json");

exports.run = async (client, message, args) => {

  const members = await message.guild.members.fetch().filter(guildMember => !guildMember.user.bot);

  message.channel.send(`${message.author} just pulled out his dick and decided to cum on ${members.random().user.toString()}. The cum flew ${Math.floor((Math.random())*42)+6} inches across the room. \n:weary::fist::eggplant::sweat_drops:`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

};

exports.help = {
  description: "makes you cum",
  usage: "!cum"
};
