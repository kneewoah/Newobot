const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.daily = (client, database) => {
  console.log(`Resetting DAILY XP totals...`)
  database.query(`UPDATE xp_${config.pillowsID} SET daily = 0 WHERE 1`, (err) => {
    if(err) throw err;
    console.log(`SQL: Reset DAILY XP totals.`);
  });
};

exports.weekly = (client, database) => {
  console.log(`Resetting WEEKLY XP totals...`)
  database.query(`UPDATE xp_${config.pillowsID} SET weekly = 0 WHERE 1`, (err) => {
    if(err) throw err;
  });

  console.log(`SQL: Reset WEEKLY XP totals.`);

  const embed = new Discord.MessageEmbed({
    color: `0x2F69EC`,
    timestamp: Date.now(),
    footer: {
      icon_url: client.user.avatarURL(),
      text: "© 2021 Newo"
  });

  var data;
  database.query(`SELECT * FROM xp_${config.pillowsID} WHERE 1`, (err, returned) => {
    if(err) throw err;
    data = returned;
  }

  const channel = client.guilds.cache.get(config.pillowsID).channels.cache.get(config.pillowsGeneralID);

  require(`lb.js`).sendCategoryLb("weekly", embed, channel, data);
});

exports.monthly = (client, database) => {
  console.log(`Resetting MONTHLY XP totals...`)
  database.query(`UPDATE xp_${config.pillowsID} SET monthly = 0 WHERE 1`, (err) => {
    if(err) throw err;
    console.log(`SQL: Reset MONTHLY XP totals.`);
  });
};
