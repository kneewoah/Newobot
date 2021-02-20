const config = require("../config.json");

exports.run = async (client, message, args) => {

  var members = await message.guild.members.cache.get();
  console.log(members);

  message.channel.send(`${message.author} just pulled out his dick and decided to cum on ${members.random().toString()}. The cum flew ${Math.floor((Math.random())*42)+6} inches across the room. \n:weary::fist::eggplant::sweat_drops:`)

};

exports.help = {
  description: "makes you cum",
  usage: "!cum"
};
