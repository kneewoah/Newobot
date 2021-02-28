const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

function sendLevelUpMsg(user, channel, level) {
  console.log(`${user.toString()} leveled up to level ${level}`);
  channel.send(`Level up, ${user.toString()}! You are now level ${level}`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
}

function generateXp(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.text = (client, message, database) => {
    // exit if not pillows
    if (message.guild.id != config.pillowsID) return;

    const table = `xp_${config.pillowsID}`;
    const newTime = new Date().getTime();

    database.query(`SELECT * FROM ${table} WHERE id = '${message.author.id}'`, (err, rows) => {
      if(err) throw err;

      var genXp = generateXp(15, 25);

      // If new user
      if(rows.length < 1) {
        var newData = {
          id: message.author.id,
          xp: genXp,
          daily: genXp,
          weekly: genXp,
          monthly: genXp,
          timeStamp: newTime,
          progress: genXp,
          level: 0
        };

        const sql = `INSERT INTO ${table} (id, xp, daily, weekly, monthly, timeStamp, progress, level) VALUES (${message.author.id}, ${newData.xp}, ${newData.daily}, ${newData.weekly}, ${newData.monthly}, ${newData.newTime}, ${newData.progress}, ${newData.level})`;

        database.query(sql, () => {
          if(err) throw err;
          console.log(`SQL: Inserted a new row for ${message.author.tag} in ${table} with the following parameters: ${JSON.stringify(newData)}`);
        });

      // If existing User
      } else {
        var oldTime = rows[0].timestamp;
        var diff = (newTime - oldTime);

        // If cooldown over
        if (diff >= config.xpCoolDownMs) {
          // update params
          var newData = {
            progress: rows[0].progress + genXp,
            level: rows[0].level,
            xp: rows[0].xp + genXp,
            daily: rows[0].daily + genXp,
            weekly: rows[0].weekly + genXp,
            monthly: rows[0].monthly + genXp,
            timeStamp: newTime
          };

          // check if level update
          var thresh = 5*Math.pow(newData.level, 2)+50*newData.level+100;
          if (newData.progress >= thresh) {
            newData.level++;
            newData.progress -= thresh;
            sendLevelUpMsg(message.author, message.channel, newData.level);
          }

          var sql = `UPDATE ${table} SET xp = ${newData.xp}, daily = ${newData.daily}, weekly = ${newData.weekly}, monthly = ${newData.monthly}, timeStamp = ${newData.timeStamp}, level = ${newData.level}, progress = ${newData.progress} WHERE id = '${message.author.id}'`;

          database.query(sql, (err) => {
            if(err) throw err;
            console.log(`SQL: Updated XP for ${message.author.tag} in ${table} with the following parameters: ${JSON.stringify(newData)}`);
          });

        }
      }

    });
};

exports.voice = (client, oldVoiceState, newVoiceState, database) => {

  if (((newVoiceState.channel == null && !oldVoiceState.deaf && oldVoiceState.channel !== null) || (newVoiceState.deaf && newVoiceState.channel == oldVoiceState.channel) || (oldVoiceState.channel !== newVoiceState.channel && !oldVoiceState.deaf && oldVoiceState.channel !== null)) && !((oldVoiceState.channel == null && oldVoiceState.channel.id === config.pillowsAFK) || oldVoiceState.guild.id !== config.pillowsID || (oldVoiceState.channel === null && newVoiceState.channel.id === config.pillowsAFK))) { // END XP COUNT

    if(!newVoiceState.deaf && !oldVoiceState.deaf && oldVoiceState.channel !== null && newVoiceState.channel !== null && oldVoiceState.channel !== newVoiceState.channel) return;

    console.log(`UPDATING voice channel XP for ${oldVoiceState.member.user.tag}`);
    database.query(`SELECT xp, daily, weekly, monthly, progress, level, voiceStart FROM xp_${config.pillowsID} WHERE id = '${newVoiceState.member.id}'`, (err, data) => {
        const time = Math.floor(new Date().getTime() / 60000);
        const diff = time - data[0].voiceStart;

        var newXp = 0;
        for (var i = 0; i < diff; i++) {
          newXp += generateXp(6, 10);
        }

        var newData = {
          xp: data[0].xp + newXp,
          daily: data[0].daily + newXp,
          weekly: data[0].weekly + newXp,
          monthly: data[0].monthly + newXp,
          level: data[0].level,
          progress: data[0].progress + newXp
        };

        // check if level updates
        while (newData.progress >= 5*Math.pow(newData.level, 2)+50*newData.level+100) {
          newData.progress -= (5*Math.pow(newData.level, 2)+50*newData.level+100);
          newData.level++;
          sendLevelUpMsg(newVoiceState.member.user, newVoiceState.guild.channels.cache.get(config.pillowsGeneralID), newData.level);
        }
        console.log(`${oldVoiceState.member.user.tag} earned ${newXp} xp over ${diff} minutes`);
        var sql = `UPDATE xp_${config.pillowsID} SET xp = ${newData.xp}, daily = ${newData.daily}, weekly = ${newData.weekly}, monthly = ${newData.monthly}, level = ${newData.level}, progress = ${newData.progress} WHERE id = '${newVoiceState.member.id}'`;

        database.query(sql, () => {
          if(err) throw err;
          console.log(`SQL: Updated XP for ${newVoiceState.member.user.tag} in xp_${config.pillowsID} with the following parameters: ${JSON.stringify(newData)}`);
        });
    });
  } else if ((!newVoiceState.deaf && newVoiceState.channel !== null) && (oldVoiceState.deaf || oldVoiceState.channel !== newVoiceState.channel)) { // BEGIN XP COUNT
    if (newVoiceState.guild.id !== config.pillowsID) return;
    if (newVoiceState.guild.id === config.pillowsAFK) return;

    console.log(`Logging start time for voice channel XP for ${oldVoiceState.member.user.tag}`);

    const time = Math.floor(new Date().getTime() / 60000);
    database.query(`UPDATE xp_${config.pillowsID} SET voiceStart = '${time}' WHERE id = '${newVoiceState.member.id}'`, (err) => {
      if(err) throw(err);
      console.log(`SQL: Updated XP for ${newVoiceState.member.user.tag} in xp_${config.pillowsID} with the following parameters: ${JSON.stringify({time: time})}`);
    });
  }
};
