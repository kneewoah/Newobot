const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, database, member) => {

    // COLOR GREETER
    let roleName = `${member.id}`;

    // Apply old color
    var existingRole = member.guild.roles.cache.find(role => role.name === roleName);
    if (existingRole) {
      member.roles.add(existingRole, `Someone removed this role from ${member}`)
      .then(u => console.log(`Added role '${exisitingRole.name}' to ${u}.`))
      .catch(console.error);

    } else {
      message.guild.roles.create({
        data: {
          name: `${roleName}`,
          color: `0x${Math.floor(Math.random()*16777215).toString(16)}`,
          hoist: false,
          mentionable: false,
        },
        reason: `Default color for ${member.username}`
      })
      .then(r => {
        console.log(`Created role '${r}'.`);
        message.member.roles.add(roleName, "Newo Bot")
        .then(u => console.log(`Added role '${newRole.name}' to ${u}.`))
        .catch(console.error);
      })
      .catch(console.error);

    };
};
