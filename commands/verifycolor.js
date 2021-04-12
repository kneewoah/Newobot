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

  const roles = message.guild.roles.cache.filter(role => role.name.match(/[0-9]{18}/g));

  roles.forEach(role => {
    members = role.members.array();
    if (members == undefined) console.log("delete");//role.delete("extraneous role color - verify color command")
    // .then(deleted => console.log(`Deleted role ${deleted.name}`))
    // .catch(console.error);

    else {
      members.forEach(member => {
        if (member.id !== role.name) member.roles.remove(role, "this role was not made for this user - verify color command")
          .then(u => console.log(`Removed role '${r.name}' from ${u.user.tag}.`))
          .catch(console.error);
      });
    }
  });

  console.log(`All color roles now applied correctly.`);
}

exports.help = {
  description: "Verify everyone has their color role (Newo Only)",
  usage: `${config.prefix}verifycolor`
};
