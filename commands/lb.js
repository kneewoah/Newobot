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

    if ((args[0]) && (args[0].toLowerCase() === "daily" || args[0].toLowerCase() === "weekly" || args[0].toLowerCase() === "monthly")) {
      embed.setTitle(`Pillows ${args[].toLowerCase().charAt(0).toUpperCase() + args[0].toLowerCase().slice(1)} XP Rankings`);
      require(`./lb.js`).sendCategoryLb(args[0].toLowerCase(), embed, message.channel, data);

    } else {
      const sorted = data.sort((a, b) => (a.xp > b.xp ? -1 : 1));

      for (var i = 0; i < sorted.length; i++) {
        var user = message.guild.members.cache.get(sorted[i].id).user
        embed.addField(`${i+1}. ${user.username}`, `**XP:** ${sorted[i].xp}\n**Level:** ${sorted[i].level}`, true);
      }

      embed.setTitle(`Pillows XP Leaderboard`);

      message.channel.send(embed)
      .then(message => console.log(`Sent a leaderboard embed`))
      .catch(console.error);
    }

  });

};

exports.sendCategoryLb = (style, embed, channel, data) => {
  var category = style.toLowerCase();
  const sorted = data.sort((a, b) => (a[category] > b[category] ? -1 : 1)).filter(obj => (obj[category] !== 0));
  for (var i = 0; i < sorted.length; i++) {
    var user = channel.guild.members.cache.get(sorted[i].id).user;
    embed.addField(`${i+1}. ${user.username}`, `**XP:** ${sorted[i][category]}`, false);
  }

  channel.send(embed)
  .then(message => console.log(`Sent a ${category} leaderboard embed`))
  .catch(console.error);
};

exports.help = {
  description: "Leaderboard command, leaving the 1st option blank will dis play the all time leaderboard",
  usage: `${config.prefix}lb {daily | weekly | monthly}`
};
