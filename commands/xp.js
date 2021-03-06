const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {

  let target;
  if (message.mentions.members.first()) {
    target = message.mentions.members.first().user;
  } else {
    target = message.author;
  }

  con.query(`SELECT * FROM xp_${message.guild.id} WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send("imagine having 0 xp lol")
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);

    const xp = rows[0].xp;
    const lvlObj = require(`../modules/handleXP.js`).getLevel(xp);
    const lvl = lvlObj.level;
    const progress = lvlObj.progress;
    const xpToNextLvl = 5*Math.pow((lvl),2)+50*(lvl)+100;
    const color = message.guild.roles.cache.find(role => role.name === target.id).color.toString(16);

    var progString = "";
    var i;
    for (i = 0; i < Math.floor(progress/xpToNextLvl * 10); i++) {
      progString = progString + "🔵";
    }
    for (var j = i; j < 10; j++) {
      progString = progString + "⚫";
    }

    const data = {
      title: `XP for ${target.username}`,
      color: color,
      timestamp: Date.now(),
      fields: [
        {
          name: "XP",
          value: xp,
          inline: false
        },
        {
          name: "Level",
          value: lvl,
          inline: false
        },
        {
          name: "XP to Next Level",
          value: `${progress} / ${xpToNextLvl}\n${progString}`,
          inline: false
        }
      ],
      footer: {
        icon_url: client.user.avatarURL(),
        text: "© 2021 Newo"
      }
    }

    var embed = new Discord.MessageEmbed(data);
    embed.setThumbnail(target.avatarURL());
    message.channel.send(embed)
      .then(message => console.log(`Sent message: <XP embed>`))
      .catch(console.error);
  });

};

exports.help = {
  description: "XP tracker",
  usage: `${config.prefix}xp`
};
