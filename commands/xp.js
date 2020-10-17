const config = require("../config.json");

exports.run = (client, message, args, con) => {

  let target = message.author; //message.mentions.users.first() || message.guild.members.get(args[1]) ||

  con.query(`SELECT * FROM xp WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send("this user has no XP.");
    let xp = rows[0].xp;
    message.channel.send(xp);
  });

}

exports.help = {
  description: "WIP - XP tracker",
  usage: "!xp"
};
