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

    var i = 1;
    const cache = message.guild.members.cache;
    sorted.forEach(entry => {

      var user = cache.get(entry.id).user;
      embed.addField(`**${i}.** ${user.toString()}`, `**XP:** ${entry.xp}\n**Level:** ${entry.level}`, true);
      i++;
    });

    message.channel.send(embed);
  });

};

exports.help = {
  description: "Leaderboard!",
  usage: "!lb"
};
