const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message) => {

  console.log(`DM recieved from ${message.author.tag}: ${message.content}`);

  const embed = new Discord.MessageEmbed({
    color: `0x2F69EC`,
    timestamp: Date.now(),
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© 2021 Newo"
    },
    title: `DM from ${message.author.tag}`
  });

  embed.addField(`Message Content`, message.content, true);

  client.users.cache.get(config.ownerID).send(embed)
    .then(message => console.log(`Sent a logged DM to Newobot to Newo`))
    .catch(console.error);;
};
