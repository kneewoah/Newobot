const config = require("../config.json");

exports.run = async (client, message, args) => {

  var randomPerson = await message.guild.members;
  console.log(randomPerson);

  message.channel.send(`${message.author} just pulled out his dick and decided to cum on ${randomPerson}. The cum flew ${Math.floor((Math.random())*42)+6} inches across the room. \n:weary::fist::eggplant::sweat_drops:`)

};

exports.help = {
  description: "makes you cum",
  usage: "!cum"
};
