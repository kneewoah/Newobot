const config = require("../config.json");

exports.run = (client, message, args, database) => {
  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  const users = message.guild.members.cache;
  const color = require(`../modules/roleColor.js`);

  users.forEach(u => {
      color.run(client, message, database, u);
  });

}

exports.help = {
  description: "Verify everyone has their color role (Newo Only)",
  usage: `${config.prefix}verifycolor`
};
