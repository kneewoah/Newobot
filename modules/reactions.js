const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.add = (client, message, user, reaction, emoji) => {
  if(message.author !== client.user)  return console.log("1");
  if(message.channel.id !== "512706031843934217") return console.log("2");

  if(emoji.name == '✅') {
      var embed = message.embeds[0];
      // Type: MessageEmbed

      var yes = embed.fields[0];
      var no = embed.fields[1];
      // Type EmbedField

      embed.spliceFields(0, 2);

      embed.addField({
        name: "Yes",
        value: yes.value + " " + user.toString(),
        inline: true
      });
      // embed.addField(no);
      message.edit(embed);
      reaction.users.remove(user);

      message.guild.channels.cache.get("512706031843934217").send(user.toString() + " can scrim.");
  }

  else if(emoji.name == '❌') {
    var embed = message.embeds[0];
    var no = embed.fields[1];

    embed.spliceFields(1, 1);

    embed.addField({name: "No", value: no.value + " " + user.toString(), inline: true});
    message.edit(embed);
    reaction.users.remove(user);
  }

};

exports.remove = (reaction, user, message, emoji) => {

};
