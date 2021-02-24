const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, args, database) => {

    // COLOR GREETER
    let roleName = `${member.id}`;

    // Apply old color
    if(member.guild.roles.cache.find(role => role.name === roleName)) {
      member.roles.add(member.guild.roles.cache.find(role => role.name === roleName).id);


    } else {
      let channel = member.guild.channels.cache.find(ch => ch.id === config.pillowsGeneralID || ch.id === config.testingChannelID);
      if (!channel) return;

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
      }))
      channel.send(`Welcome ${member.displayName}! Type \`!color #HEXCODEHERE\` to chose your role color! You can choose a color here: <https://tr.im/hexwheel>.`);
    };
};
