const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, database, member, randColor) => {

    var roleName = `${member.id}`;

    // Apply old color
    console.log(member.guild);
    var existingRole = member.guild.roles.cache.find(role => role.name === roleName);
    if (existingRole && existingRole.members.find(mem => mem.id === roleName)) return existingRole;
    else if (existingRole) {
      member.roles.add(existingRole, `Someone removed this role from ${member}`)
      .then(u => console.log(`Fixed missing role. Added role '${existingRole.name}' to ${u.user.tag}.`))
      .catch(console.error);
      return exisitngRole;

    } else {
      member.guild.roles.create({
        data: {
          name: `${roleName}`,
          color: (color === undefined) ? `0x000000` : color,
          hoist: false,
          mentionable: false,
        },
        reason: `Default color for ${member.user.tag}`
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
