const Discord = require('discord.js');
const client = new Discord.Client({disableMentions: 'everyone'});
const config = require("../config.json");

exports.run = (client, message, args, con) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission to execute this command.")
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);

    let time;
    if (!args[0]) {
      time = "Scrim 8pm EDT tonight?";
    } else {
      time = args.join(' ');
    }

    var embed = new Discord.MessageEmbed({
      title: time,
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

    embed.setThumbnail(config.mlgpillowsicon);

    message.guild.channels.cache.get(config.guilds[0].scrimChannel).send(embed).then(m => {
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
  usage: `${config.prefix}scrim [Title of Embed]`
};
