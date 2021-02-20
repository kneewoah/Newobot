const config = require("../config.json");

exports.run = async (client, message, args) => {

  var members = await message.guild.members.fetch.then(console.log).catch(console.error).cache;
  console.log(members);

  var random = members.random();
  console.log(random);

  message.channel.send(`${message.author} just pulled out his dick and decided to cum on ${random}. The cum flew ${Math.floor((Math.random())*42)+6} inches across the room. \n:weary::fist::eggplant::sweat_drops:`)

};

exports.help = {
  description: "makes you cum",
  usage: "!cum"
};
