const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {

    if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

    let time;
    if (!args[0]) {
      time = 8;
    } else {
      time = args[0];
    }

    let date;
    if (!args[1]) {
      date = "tonight";
    } else {
      date = args.slice(1).join(' ');
    }

    var embed = new Discord.MessageEmbed({
      title: `<@&474051331183607.828> Scrim ${time}pm EST ${date}\?`,
      color: "#3370FC",
      timestamp: Date.now(),
      fields: [
        {
          name: "Yes",
          value: 'h',
          inline: true
        },
        {
          name: "No",
          value: `h`,
          inline: true
        }
      ],
      footer: {
        icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png",
        text: "© 2021 Newo | Sent at "
      }
    });

    message.guild.channels.cache.get(config.pillowsGeneralID).send(embed).then(m => {
      m.react("✅");
      m.react("❌");
    });

};

client.on('messageReactionAdd', (reaction, user) => {
        let message = reaction.message, emoji = reaction.emoji;

        if(message.author != client.user) return;
        if(message.channel != config.pillowsGeneralID) return;

        if(emoji.name == '✅') {
            var embed = message.embeds[0];
            var yes = embed.fields[0];
            var no = embed.fields[1];

            embed.spliceFields(0);

            embed.addField({name: "Yes", value: yes.value + " " + user.toString(), inline: true})
            embed.addField(no);
        }

        else if(emoji.name == '❌') {
          var embed = message.embeds[0];
          var yes = embed.fields[0];
          var no = embed.fields[1];

          embed.spliceFields(0);

          embed.addField(yes)
          embed.addField({name: "No", value: no.value + " " + user.toString(), inline: true});
        }

        // Remove the user's reaction
        reaction.remove(user);
});

exports.help = {
  description: "scrim announcement",
  usage: "!scrim <time> <date>"
};
