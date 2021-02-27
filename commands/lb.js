const Discord = require('discord.js');
const config = require("../config.json");


exports.run = (client, message, args, con) => {

  con.query(`SELECT * FROM xp_${message.guild.id}`, (err, data) => {
    if(err) throw err;

    var color = message.guild.roles.cache.find(role => role.name === message.author.id).color.toString(16);

    const embed = new Discord.MessageEmbed({
      color: color,
      timestamp: Date.now(),
      footer: {
        icon_url: client.user.avatarURL(),
        text: "© 2021 Newo"
      }
    });

    var category = args[0].toLowerCase();

    if (category === "daily" || category === "weekly" || category === "monthly") {
      const sorted = data.sort((a, b) => (a.category > b.category ? -1 : 1));
      for (var i = 0; i < sorted.length; i++) {
        var user = message.guild.members.cache.get(sorted[i].id).user
        embed.addField(`${i+1}. ${user.username}`, `**XP:** ${sorted[i][category]}`, false);
      }

      embed.setTitle(`Pillows ${category.charAt(0).toUpperCase() + category.slice(1)} XP Rankings`);

    } else {
      const sorted = data.sort((a, b) => (a.xp > b.xp ? -1 : 1));

      for (var i = 0; i < sorted.length; i++) {
        var user = message.guild.members.cache.get(sorted[i].id).user
        embed.addField(`${i+1}. ${user.username}`, `**XP:** ${sorted[i].xp}\n**Level:** ${sorted[i].level}`, true);
      }

      embed.setTitle(`Pillows XP Leaderboard`);
    }

    message.channel.send(embed)
    .then(message => console.log(`Sent a leaderboard embed`))
    .catch(console.error);

  });

};

exports.help = {
  description: "Leaderboard!",
  usage: `${config.prefix}lb`
};
