const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, database, member) => {

    // COLOR GREETER
    let roleName = `${member.id}`;

    // Apply old color
    var existingRole = member.guild.roles.cache.find(role => role.name === roleName);
    if (existingRole) {
      member.roles.add(existingRole);

    } else {
      // Assign random color
      message.member.roles.add(
        message.guild.roles.create({
        data: {
          name: `${roleName}`,
          color: `0x${Math.floor(Math.random()*16777215).toString(16)}`,
          hoist: false,
          mentionable: false,
        },
        reason: `Default color for ${author.username}`
      }), "Newo Bot");
    };
};
