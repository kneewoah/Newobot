const config = require("../config.json");

exports.run = (client, message, args, database) => {
  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  const mems = message.guild.members.cache.filter(guildMember => !guildMember.user.bot);
  const color = require(`../modules/roleColor.js`);

  mems.forEach(member => {
    const role = require(`../modules/roleColor.js`).run(client, database, member, undefined, "!color command");
    role.edit({color: `0x${Math.floor(Math.random()*16777215).toString(16)}`}, "!randomize")
      .then(updated => console.log(`Edited role color for ${member.user.tag} to ${updated.color}`))
      .catch(console.error);
  });

}

exports.help = {
  description: "Randomize everyone's colors (Newo Only)",
  usage: `${config.prefix}randomize`
};
