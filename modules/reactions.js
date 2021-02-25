const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.add = (client, message, user, reaction, emoji, database) => {

  if((message.author === client.user) && (message.channel.id === config.scrimChannel))  {
    if(emoji.name == '✅') {
        var embed = message.embeds[0];
        // Type: MessageEmbed

        var yes = embed.fields[0].value.split("\n");
        var no = embed.fields[1].value.split("\n");

        embed.spliceFields(0, 2);

        console.log(yes[1]);
        console.log(user.username);

        var yesIndex = yes.indexOf(user.username);
        var noIndex = no.indexOf(user.username);
        if (yesIndex = -1) {
          yes.push(user.username);
          yes[0]++;
          console.log("user added");
        } else if (noIndex > -1) {
          array.splice(noIndex, 1);
          no[0]--;
        }

        embed.addField("Yes", yes, false);
        embed.addField("No", no, false);

        message.edit(embed);
        reaction.users.remove(user);

        message.guild.channels.cache.get(config.pillowsGeneralID).send(user.toString() + " can scrim.");

    } else if(emoji.name == '❌') {
      var embed = message.embeds[0];
      var yes = embed.fields[0];
      var no = embed.fields[1];

      embed.spliceFields(0, 2);

      var count = parseInt(no.value.substring(0,1), 10);
      count++;

      embed.addField("Yes", yes.value.replace(user.toString(), ""), true);
      embed.addField("No", count + no.value.substring(1).replace(user.toString(), "") + user.toString(), true);

      message.edit(embed);
      reaction.users.remove(user);

      message.guild.channels.cache.get(config.pillowsGeneralID).send(user.toString() + " cannot scrim.");
    }
  }


};

exports.remove = (reaction, user, message, emoji, database) => {

};
