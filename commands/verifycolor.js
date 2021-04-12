const config = require("../config.json");

exports.run = (client, message, args, database) => {
  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  const mems = message.guild.members.cache.filter(guildMember => !guildMember.user.bot);
  const color = require(`../modules/roleColor.js`);

  mems.forEach(member => {
    color.run(client, database, member, undefined, "!verify color command");
  });

  setTimeout(function() {
    require(`../modules/roleColor.js`).verify(message.guild, "!verify command");
  }, 1000);

  console.log(`All color roles now applied correctly.`);
}

exports.help = {
  description: "Verify everyone has their color role (Newo Only)",
  usage: `${config.prefix}verifycolor`
};
