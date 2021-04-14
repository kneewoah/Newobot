const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.add = (client, message, user, reaction, emoji, database) => {

  if((message.author === client.user) && (message.channel.id === config.guilds[0].scrimChannel))  {
    if(emoji.name == '✅') {
        console.log(`Processing ${user.username}'s ${reaction.emoji.name} reaction to scrim message ${message.id}`);
        var embed = message.embeds[0];

        var yes = embed.fields[0].value.split("\n");
        var no = embed.fields[1].value.split("\n");

        embed.spliceFields(0, 2);

        var yesIndex = yes.indexOf(user.toString());
        var noIndex = no.indexOf(user.toString());

        if (yesIndex == -1) {
          yes.push(user.toString());
          console.log(`Added ${user.username} as a yes for scrim message ${message.id}`)
          yes[0]++;
          console.log(`Increased 'yesses' to ${yes[0]} for scrim message ${message.id}`)
          message.guild.channels.cache.get(config.guilds[0].generalID).send(user.toString() + " can play.")
            .then(message => console.log(`Sent message: ${message.content}`))
            .catch(console.error);
        } if (noIndex > -1) {
          no.splice(noIndex, 1);
          console.log(`Removed ${user.username} as a no for scrim message ${message.id}`)
          no[0]--;
          console.log(`Decreased 'noes' to ${no[0]} for scrim message ${message.id}`)
        }

        embed.addField("Yes", yes, false);
        embed.addField("No", no, false);

        message.edit(embed)
          .then(() => console.log(`Updated the embed for scrim message ${message.id}`))
          .catch(console.error);
        reaction.users.remove(user)
          .then(() => console.log(`Removed ${user.username}'s ${reaction.emoji.name} reaction from scrim message ${message.id}`))
          .catch(console.error);

    } else if(emoji.name == '❌') {
      console.log(`Processing ${user.username}'s ${reaction.emoji.name} reaction to scrim message ${message.id}`)
      var embed = message.embeds[0];

      var yes = embed.fields[0].value.split("\n");
      var no = embed.fields[1].value.split("\n");

      embed.spliceFields(0, 2);

      var yesIndex = yes.indexOf(user.toString());
      var noIndex = no.indexOf(user.toString());

      if (noIndex == -1) {
        no.push(user.toString());
        console.log(`Added ${user.username} as a no for scrim message ${message.id}`);
        no[0]++;
        console.log(`Increased 'noes' to ${no[0]} for scrim message ${message.id}`);

        message.guild.channels.cache.get(config.guilds[0].generalID).send("Please let us know why you cannot play, " + user.toString())
          .then(message => console.log(`Sent message: ${message.content}`))
          .catch(console.error);
      } if (yesIndex > -1) {
        yes.splice(yesIndex, 1);
        console.log(`Removed ${user.username} as a yes for scrim message ${message.id}`)
        yes[0]--;
        console.log(`Decreased 'yesses' to ${yes[0]} for scrim message ${message.id}`)
      }

      embed.addField("Yes", yes, true);
      embed.addField("No", no, true);

      message.edit(embed)
        .then(() => console.log(`Updated the embed for scrim message ${message.id}`))
        .catch(console.error);
      reaction.users.remove(user)
        .then(() => console.log(`Removed ${user.username}'s ${reaction.emoji.name} reaction from scrim message ${message.id}`))
        .catch(console.error);

    }
  }


};

exports.remove = (reaction, user, message, emoji, database) => {

};
