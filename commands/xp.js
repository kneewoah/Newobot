const config = require("../config.json");

exports.run = (client, message, args, con) => {

  let target = message.author; //message.mentions.users.first() || message.guild.members.get(args[1]) ||

  con.query(`SELECT * FROM xp_${message.guild.id} WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send("imagine having 0 xp lol");
    let xp = rows[0].xp;
    var lvl = findLvl(xp);
    message.channel.send(`Your total XP is: ${xp}. Your level is: ${lvl}.`);
  });



  function findLvl(xp) {
    for (var i = 1; i < 200; i++) {
      if (xp < xpNeeded(i))return i-1;
    }
  }

  function xpNeeded(level) {
    if (level = 0) return 0;
    xpNeeded = 0;
    for (var i = 0; i < level; i++) {
      xpNeeded += 5*Math.pow((level-1),2)+50*(level-1)+100;
    }
  }
});

exports.help = {
  description: "WIP - XP tracker",
  usage: "!xp"
};
