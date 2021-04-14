const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.daily = (client, database) => {
  console.log(`Resetting DAILY XP totals...`)
  database.query(`UPDATE xp_${config.guilds[0].id} SET daily = 0 WHERE 1`, (err) => {
    if(err) throw err;
    console.log(`SQL: Reset DAILY XP totals.`);
  });
};

exports.weekly = (client, database) => {
  console.log(`Resetting WEEKLY XP totals...`)

  const date = new Date();
  const date2 = new Date();

  date.setTime(date.getTime() - 24*60*60*1000);
  date2.setTime(date.getTime() - 6*24*60*60*1000);

  var months = config.months;

  const endDate = months[date.getMonth()] + " " + date.getDate();
  const startDate = months[date2.getMonth()] + " " + date2.getDate();

  const embed = new Discord.MessageEmbed({
    color: `0x2F69EC`,
    timestamp: Date.now(),
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© 2021 Newo"
    },
    title: `Final Weekly XP Totals for the week of ${startDate} - ${endDate}`
  });

  const channel = client.guilds.cache.get(config.guilds[0].id).channels.cache.get(config.pillowsGeneralID);

  database.query(`SELECT * FROM xp_${config.guilds[0].id} WHERE 1`, (err, data) => {
    if(err) throw err;
    require(`../commands/lb.js`).sendCategoryLb("weekly", embed, channel, data);
  });

  database.query(`UPDATE xp_${config.guilds[0].id} SET weekly = 0 WHERE 1`, (err) => {
    if(err) throw err;
  });

  console.log(`SQL: Reset WEEKLY XP totals.`);
};

exports.monthly = (client, database) => {
  console.log(`Resetting MONTHLY XP totals...`);

  const date = new Date();
  date.setTime(date.getTime() - 24*60*60*1000);
  var months = config.months;
  const month = months[date.getMonth()];

  const embed = new Discord.MessageEmbed({
    color: `0x2F69EC`,
    lastMessage: Date.now(),
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© 2021 Newo"
    },
    title: `Final Monthly XP Totals for the month of ${month}`
  });

  const channel = client.guilds.cache.get(config.guilds[0].id).channels.cache.get(config.guilds[0].generalID);

  database.query(`SELECT * FROM xp_${config.guilds[0].id} WHERE 1`, (err, data) => {
    if(err) throw err;
    const winner = require(`../commands/lb.js`).sendCategoryLb("monthly", embed, channel, data);
    channel.send(`Congratulations, ${channel.guild.members.cache.get(winner.id).user.toString()}, you topped the leaderboard this month with ${winner.monthly} xp!`)
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);
  });

  database.query(`UPDATE xp_${config.guilds[0].id} SET monthly = 0 WHERE 1`, (err) => {
    if(err) throw err;
  });

  console.log(`SQL: Reset MONTHLY XP totals.`);
};
