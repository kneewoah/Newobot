const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.text = (client, message, database) => {
    // exit if not pillows
    if (message.guild.id != config.pillowsID) return;

    const table = `xp_${config.pillowsID}`;
    const newTime = new Date().getTime();

    database.query(`SELECT * FROM ${table} WHERE id = '${message.author.id}'`, (err, rows) => {
      if(err) throw err;

      var genXp = generateXp();

      // If new user
      if(rows.length < 1) {
        var newData = {
          xp: genXp,
          timeStamp: newTime,
          progress: genXp,
          level: 0
        };

        const sql = `INSERT INTO ${table} (id, xp, timeStamp, progress, level) VALUES ('${message.author.id}', ${newData.xp}, ${newData.newTime}, ${newData.progress}, ${newData.level})`;

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
            timeStamp: newTime
          };

          // check if level update
          var thresh = 5*Math.pow(newData.level, 2)+50*newData.level+100;
          if (newData.progress >= thresh) {
            newData.level++;
            newData.progress -= thresh;
            levelUpMsg(newData.level);
          }

          var sql = `UPDATE ${table} SET xp = ${newData.xp}, timeStamp = ${newData.timeStamp}, level = ${newData.level}, progress = ${newData.progress} WHERE id = '${message.author.id}'`;

          database.query(sql, () => {
            if(err) throw err;
            console.log(`SQL: Updated XP for ${message.author.tag} in ${table} with the following parameters: ${JSON.stringify(newData)}`);
          });

        }
      }

    });

    function generateXp() {
      var min = 15;
      var max = 25;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function levelUpMsg(newLevel) {
      message.channel.send(`Level up! You are now level ${newLevel}`);
    }
};

exports.voice = (client, oldVoiceState, newVoiceState, database) => {
  console.log(oldVoiceState.channelID);
  console.log(newVoiceState.channelID);
};
