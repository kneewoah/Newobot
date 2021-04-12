const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, database, member, color, reason) => {

    var roleName = `${member.id}`;

    // Apply old color

    var existingRole = member.guild.roles.cache.find(role => role.name === roleName);
    if (existingRole && existingRole.members.find(mem => mem.id === roleName)) return existingRole;
    else if (existingRole) {
      member.roles.add(existingRole, `Someone removed this role from ${member}`, reason)
      .then(u => console.log(`Fixed missing role. Added role '${existingRole.name}' to ${u.user.tag}.`))
      .catch(console.error);
      return existingRole;

    } else {
      member.guild.roles.create({
        data: {
          name: `${roleName}`,
          color: (color === undefined) ? `0x000000` : color,
          hoist: false,
          mentionable: false,
        },
        reason: `Default color for ${member.user.tag} - ${reason}`
      })
      .then(r => {
        console.log(`Created role '${r.name}'.`);
        member.roles.add(r, "Newo Bot")
        .then(u => console.log(`Added role '${r.name}' to ${u.user.tag}.`))
        .catch(console.error);
        return r;
      })
      .catch(console.error);

    };
};

exports.delete = (client, member, guild) => {
  var roleToDelete = guild.roles.cache.find(role => role.name === member.id);
  roleToDelete.delete('User left the server')
  .then(deleted => console.log(`Deleted role ${deleted.name}`))
  .catch(console.error);
};

exports.verify = (guild, reasonLoc) => {
  const roles = guild.roles.cache.filter(role => role.name.match(/[0-9]{18}/g));

  roles.forEach(role => {
    members = role.members.array();
    if (members.length == 0) role.delete("extraneous role color - " + reasonLoc)
      .then(deleted => console.log(`Deleted role ${deleted.name}`))
      .catch(console.error);

    else {
      members.forEach(member => {
        if (member.id !== role.name) member.roles.remove(role, "this role was not made for this user - " + reasonLoc)
          .then(usr => console.log(`Removed role '${role.name}' from ${usr.user.tag}.`))
          .catch(console.error);
      });
    }
  });
};
