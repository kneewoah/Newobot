const config = require("../config.json");

exports.run = (client, message, args, con) => {

  let target = message.author; //message.mentions.users.first() || message.guild.members.get(args[1]) ||

  con.query(`SELECT * FROM xp_${message.guild.id} WHERE id = '${target.id}'`, (err, rows) => {
    if(err) throw err;

    if(!rows[0]) return message.channel.send("imagine having 0 xp lol");
    let xp = rows[0].xp;
    message.channel.send(xp);
  });

}

exports.help = {
  description: "WIP - XP tracker",
  usage: "!xp"
};
