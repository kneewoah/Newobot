const config = require("../config.json");

exports.run = (client, message, args, con) => {

  var toNextLvl = 0;
  function findLvl(xp) {
    for (var i = 1; i < 200; i++) {
      toNextLvl += 5*Math.pow((i-1),2)+50*(i-1)+100;
      if (xp < toNextLvl) return i-1;
    }
  }

  let target;
  if (message.mentions.members.first()) {
    target = message.mentions.members.first().user;
  } else {
    target = message.author;
  }

  con.query(`SELECT * FROM xp_${message.guild.id} WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send("imagine having 0 xp lol");
    let xp = rows[0].xp;
    var lvl = findLvl(xp);

    const data = {
      "title": `XP for ${target.username}`,
      "color": 53380,
      "fields": [
        {
          "name": "XP",
          "value": `${xp}`,
          "inline": false
        },
        {
          "name": "Level",
          "value": `${lvl}`,
          "inline": false
        },
        {
          "name": "XP to Next Level",
          "value": `${progress} / ${toNextLvl}`,
          "inline": false
        }
      ]
    }
    
    var embed = new Discord.RichEmbed(data);
    message.channel.send(embed);
  });

};

exports.help = {
  description: "WIP - XP tracker",
  usage: "!xp"
};
