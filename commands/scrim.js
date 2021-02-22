const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {

    if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

    var time = args[0];
    var date = args.slice(1).join(' ');

    client.guild.cache.find(config.pillowsID).channels.cache.find(config.scrimChannel)
    .send(`@everyone Scrim ${time}pm EST ${date}?`).react(✅)


};

exports.help = {
  description: "scrim announcement",
  usage: "!scrim <time> <date>"
};
