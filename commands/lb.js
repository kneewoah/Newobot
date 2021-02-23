const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {
  var recurseXp;

  function findLvl(xp) {
    recurseXp = xp;
    var i = 0;
    var leftover = 0;
    while (recurseXp >= 0) {
      recurseXp -= (5*Math.pow((i),2)+50*(i)+100);
      i++;
    }
    return i-1;
  }

  let target;
  if (message.mentions.members.first()) {
    target = message.mentions.members.first().user;
  } else {
    target = message.author;
  }

  con.query(`SELECT * FROM xp_${message.guild.id}`, (err, data) => {
    if(err) throw err;

    data.sort((a, b) => b.xp - a.xp);
    console.log(data);

    // var xp = rows[0].xp;
    // var lvl = findLvl(xp);
    // var xpToNxtLvl = 5*Math.pow((lvl),2)+50*(lvl)+100;
    // var progress = xpToNxtLvl + recurseXp;
    //
    // var color = message.guild.roles.cache.find(role => role.name === target.id).color.toString(16);
    //
    //
    // var embed = new Discord.MessageEmbed({
    //   title: `Pillows XP Leaderboard`,
    //   color: color,
    //   timestamp: Date.now(),
    //   footer: {
    //     icon_url: client.user.avatarURL(),
    //     text: "© 2021 Newo"
    //   }
    // });
    //
    // embed.setThumbnail(target.avatarURL());
    // message.channel.send(embed);
  });

};

exports.help = {
  description: "Leaderboard!",
  usage: "!lb"
};
