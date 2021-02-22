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

    var x = message.channels.cache.find(config.scrimChannel);
    var y = x.send(`@everyone Scrim ${time}pm EST ${date}\?`)
    y.react(✅);
    y.react(❌);

};

exports.help = {
  description: "scrim announcement",
  usage: "!scrim <time> <date>"
};
