const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

function levelUpMsg(user, Level) {
  console.log(`${user.toString} leveled up to level ${level}`);
  message.channel.send(`Level up, ${user.toString}! You are now level ${level}`)
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
            levelUpMsg(message.autuhor, newData.level);
          }

          var sql = `UPDATE ${table} SET xp = ${newData.xp}, timeStamp = ${newData.timeStamp}, level = ${newData.level}, progress = ${newData.progress} WHERE id = '${message.author.id}'`;

          database.query(sql, (err) => {
            if(err) throw err;
            console.log(`SQL: Updated XP for ${message.author.tag} in ${table} with the following parameters: ${JSON.stringify(newData)}`);
          });

        }
      }

    });
};

exports.voice = (client, oldVoiceState, newVoiceState, database) => {

  if (newVoiceState.channel == null || newVoiceState.deaf || (oldVoiceState.channel !== newVoiceState.channel)) { // END XP COUNT
    if (oldVoiceState.guild.id !== config.pillowsID) return;

    database.query(`SELECT xp, progress, level, voiceStart FROM xp_${config.pillowsID} WHERE id = '${newVoiceState.member.id}'`, (err, data) => {
        const time = new Date().getTime() / 60000;
        const diff = time - data[0].voiceStart;

        var newXp = 0;
        for (var i = 0; i < diff; i++) {
          newXp += generateXp(3, 5);
        }

        var newData = {
          xp: data[0].xp + newXp,
          level: data[0].level,
          progress: data[0].progress + newXp
        };

        // check if level updates
        while (newData.progress >= 5*Math.pow(newData.level, 2)+50*newData.level+100) {
          newData.progress -= (5*Math.pow(newData.level, 2)+50*newData.level+100);
          newData.level++;
          levelUpMsg(newVoiceState.member.user, newData.level);
        }

        var sql = `UPDATE xp_${config.pillowsID} SET xp = ${newData.xp}, level = ${newData.level}, progress = ${newData.progress} WHERE id = '${newVoiceState.member.id}'`;

        database.query(sql, () => {
          if(err) throw err;
          console.log(`SQL: Updated XP for ${newVoiceState.member.user.tag} in xp_${config.pillowsID} with the following parameters: ${JSON.stringify(newData)}`);
        });
    });
  } else if (oldVoiceState.channel == null || !newVoiceState.deaf) { // BEGIN XP COUNT
    if (newVoiceState.guild.id !== config.pillowsID) return;
    const time = new Date().getTime() / 60000;
    database.query(`UPDATE xp_${config.pillowsID} SET voiceStart = '${time}' WHERE id = '${newVoiceState.member.id}'`, (err) => {
      if(err) throw(err);
    });
  } else {
    console.log(`nada`)
  }
};
