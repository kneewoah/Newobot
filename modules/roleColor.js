const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, database, member) => {

    // COLOR GREETER
    let roleName = `${member.id}`;

    // Apply old color
    var existingRole = member.guild.roles.cache.find(role => role.name === roleName);
    if (existingRole.members.find(mem => mem.id === roleName) return;
    else if (existingRole) {
      member.roles.add(existingRole, `Someone removed this role from ${member}`)
      .then(u => console.log(`Fixed missing role. Added role '${existingRole.name}' to ${u.user.tag}.`))
      .catch(console.error);

    } else {
      message.guild.roles.create({
        data: {
          name: `${roleName}`,
          color: `0x${Math.floor(Math.random()*16777215).toString(16)}`,
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
      })
      .catch(console.error);

    };
};
