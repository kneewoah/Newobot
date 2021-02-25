const config = require("../config.json");

exports.run = (client, message, args, database) => {
  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  const users = message.guild.members.cache.sweep(guildMember => guildMember.user.bot);
  const color = require(`../modules/roleColor.js`);

  users.forEach(m => {
      color.run(client, message, database, m);
  });

}

exports.help = {
  description: "Verify everyone has their color role (Newo Only)",
  usage: `${config.prefix}verifycolor`
};
