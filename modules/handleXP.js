const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, database) => {

    if (message.guild.id != config.pillowsID) return;
    const table = `xp_${config.pillowsID}`;
    const newTime = new Date().getTime();

    database.query(`SELECT * FROM ${table} WHERE id = '${message.author.id}'`, (err, rows) => {
      if(err) throw err;

      var genXp = generateXp();

      if(rows.length < 1) {

        var sql = `INSERT INTO ${table} (id, xp, timeStamp, progress, level) VALUES ('${message.author.id}', ${genXp}, ${unix}, ${genXp}, 0)`;
        console.log("NEW QUERY: " + sql);
        database.query(sql, console.log);
        console.log("NEW QUERY: " + sql);

      } else {
        var oldTime = rows[0].timestamp;
        var diff = (unix - oldTime);
        console.log("Diff: " + diff);

        if (diff >= 60) {
          // update params
          var xp = rows[0].xp + genXp;
          var progress = rows[0].progress + genXp;
          var level = rows[0].level;
          var thresh = 5*Math.pow(level, 2)+50*level+100;
          var sql = `UPDATE ${table} SET xp = ${xp}, timeStamp = ${unix}, progress = ${progress} WHERE id = '${message.author.id}'`;

          var newData = {
            xp: xp,
            timeStamp: unix,
            progress: progress,
          }

          database.query(sql)
          .then(console.log(`Updated XP for ${message.author.tag} in ${table} with the following parameters: ${newData}`))
          .catch(console.error);


          // check if level update
          if (progress >= thresh) {
            level++;
            progress -= thresh;
            sql2 = `UPDATE ${table} SET progress = ${progress}, level = ${level} WHERE id = '${message.author.id}'`;
            console.log("NEW QUERY: " + sql2);
            database.query(sql2, console.log);
            message.channel.send("Level up!"); // will make detailed later
          }
        }
      }

    });

    function generateXp() {
      var min = 15;
      var max = 25;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
