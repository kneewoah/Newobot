const config = require("../config.json");

exports.run = (client, message, args) => {
  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  console.log(message.guild.members.fetch());

}

exports.help = {
  description: "Verify everyone has their color role (Newo Only)",
  usage: `${config.prefix}verifycolor`
};
