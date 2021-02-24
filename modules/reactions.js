const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.add = (client, message, user, reaction, emoji, database) => {

  if(message.author !== client.user)  return;
  if(message.channel.id !== config.scrimChannel) return;

  if(emoji.name == '✅') {
      var embed = message.embeds[0];
      // Type: MessageEmbed

      var yes = embed.fields[0];
      var no = embed.fields[1];
      // Type EmbedField

      embed.spliceFields(0, 2);

      var count = parseInt(yes.value.substring(0,1), 10);
      count++;

      embed.addField("Yes", count + yes.value.substring(1).replace(user.toString(), "") + user.toString(), true);
      embed.addField("No", no.value.replace(user.toString(), ""), true);

      message.edit(embed);
      reaction.users.remove(user);

      message.guild.channels.cache.get(config.pillowsGeneralID).send(user.toString() + " can scrim.");
  }

  else if(emoji.name == '❌') {
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

};

exports.remove = (reaction, user, message, emoji, database) => {

};
