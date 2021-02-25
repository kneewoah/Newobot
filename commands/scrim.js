const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: 'everyone'});
const config = require("../config.json");

exports.run = (client, message, args, con) => {

    if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);

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
      title: `Scrim ${time}pm EST ${date}\?`,
      color: "#3370FC",
      timestamp: Date.now(),
      fields: [
        {
          name: "Yes",
          value: [0],
          inline: true
        },
        {
          name: "No",
          value: [0],
          inline: true
        }
      ],
      footer: {
        icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png",
        text: "© 2021 Newo"
      }
    });

    embed.setThumbnail("https://cdn.discordapp.com/attachments/434701823358795782/814306105077268490/mlgpillows.jpg");

    message.guild.channels.cache.get(config.scrimChannel).send(embed).then(m => {
      m.react("✅")
        .then((reaction) => console.log(`Reacted with ${reaction.emoji.name} to message ${message.id}`))
        .catch(console.error);
      m.react("❌")
        .then((reaction) => console.log(`Reacted with ${reaction.emoji.name} to message ${message.id}`))
        .catch(console.error);
      m.channel.send("<@&474051331183607828>")
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    });


};

exports.help = {
  description: "scrim announcement",
  usage: "!scrim <time> <date>"
};
