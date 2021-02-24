const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {

  con.query(`SELECT * FROM xp_${message.guild.id}`, (err, data) => {
    if(err) throw err;

    const sorted = data.sort((a, b) => (a.xp > b.xp ? -1 : 1));

    var color = message.guild.roles.cache.find(role => role.name === message.author.id).color.toString(16);

    var embed = new Discord.MessageEmbed({
      title: `Pillows XP Leaderboard`,
      color: color,
      timestamp: Date.now(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: "© 2021 Newo"
      }
    });

    for (var i = 0; i < sorted.length; i++) {
      var user = `<@!${sorted[i].id}>`
      embed.addField(`**${i+1}.** ${user}`, `**XP:** ${sorted[i].xp}\n**Level:** ${sorted[i].level}`, true);
    }

    message.channel.send(embed);
  });

};

exports.help = {
  description: "Leaderboard!",
  usage: "!lb"
};
