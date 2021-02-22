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
      title: `Scrim?`,
      color: "#3370FC",
      timestamp: Date.now(),
      fields: [
        {
          name: "Yes",
          value: '',
          inline: true
        },
        {
          name: "No",
          value: ``,
          inline: true
        }
      ],
      footer: {
        icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/600px-Overwatch_circle_logo.svg.png",
        text: "© 2021 Newo | Sent at "
      }
    });

    message.guild.channels.cache.get(config.pillowsGeneralID).send(`<@&474051331183607.828> Scrim ${time}pm EST ${date}\?` + embed).then(m => {
      m.react("✅");
      m.react("❌");
    });

};

exports.help = {
  description: "scrim announcement",
  usage: "!scrim <time> <date>"
};
