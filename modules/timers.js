const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, guild, database) => {
  // RECONNECT CONNECTION TO DATABASE EVERY 5 MINUTES
  setInterval(() => {
      database.query('SELECT 1');
      console.log(`Refreshing database connection`);
  }, 300000);

  // DATE CHECKER
  setInterval(() => {

    console.log(`Checking Date...`);
    var date = new Date()
    date.setTime(date.getTime() + config.timeOffset*3600000); // apply offset;
    const hour = date.getHours();
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();

    console.log(`Hour: ${hour}, Day of the Week: ${dayOfWeek}, Day of the Month: ${dayOfMonth}`);

    const xpResets = require(`./xpResets.js`);

    if(hour == 0) {
      // NEW DAY
      xpResets.daily(client, database);
    } else if (hour == 7) {
      // MORNING
      require(`./goodmorning.js`).run(client, guild, config.days[dayOfWeek]);
    } if(hour == 0) {
      // NEW DAY
      xpResets.daily(client, database);
    }

    if(dayOfWeek == 6 && hour == 12) {
      // NEW WEEK
      xpResets.weekly(client, database);
    }

    if(dayOfMonth == 1 && hour == 0) {
      // NEW MONTH
      xpResets.monthly(client, database);
    }


  }, 60
  //*60000
); // (1 hour)

  // Crash Timer
  var minutesSinceCrash = 0;
  setInterval(() => {
    minutesSinceCrash++;
    client.user.setActivity(`${minutesSinceCrash} minutes without a crash/restart!`, {type: 'PLAYING'})
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);

  }, 60000); // (1 minute)

  // Color Verification
  setInterval(() => {
    console.log(`Verifying all color roles are properly applied...`);
    const mems = client.guilds.cache.get(config.guilds[0].id).members.cache.filter(guildMember => !guildMember.user.bot);
    const color = require(`./roleColor.js`);

    mems.forEach(member => {
      color.run(client, database, member, undefined, "Newo Bot Timer");
    });

    setTimeout(function() {
      require(`./roleColor.js`).verify(client.guilds.cache.get(config.guilds[0].id), "Newo Bot Timer");
    }, 1000);

    console.log(`All color roles now applied correctly.`);
  }, 6*60*60000); // (6 hours)

};
