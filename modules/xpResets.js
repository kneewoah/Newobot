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
    console.log(`SQL: Reset WEEKLY XP totals.`);
  });

};

exports.monthly = (client, database) => {
  console.log(`Resetting MONTHLY XP totals...`)
  database.query(`UPDATE xp_${config.pillowsID} SET monthly = 0 WHERE 1`, (err) => {
    if(err) throw err;
    console.log(`SQL: Reset MONTHLY XP totals.`);
  });
};
