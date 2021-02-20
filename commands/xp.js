const config = require("../config.json");

exports.run = (client, message, args, con) => {

  function findLvl(xp) {
    var needed = 0;
    for (var i = 1; i < 200; i++) {
      needed += 5*Math.pow((i-1),2)+50*(i-1)+100;
      if (xp < needed) return i-1;
    }
  }

  let target;
  if (message.mentions.members.first()) {
    target = message.mentions.members.first();
  } else {
    target = message.author;
  }

  con.query(`SELECT * FROM xp_${message.guild.id} WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send("imagine having 0 xp lol");
    let xp = rows[0].xp;
    var lvl = findLvl(xp);
    message.channel.send(`The total XP for ${target.username} is: ${xp}. Their level is: ${lvl}.`);
  });

};

exports.help = {
  description: "WIP - XP tracker",
  usage: "!xp"
};
