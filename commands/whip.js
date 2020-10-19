const config = require("../config.json");

exports.run = (client, message, args) => {
  var randomPerson = message.guild.members.random()

  let extra;
  if ((Math.floor(Math.random()*10)) < 1) {
    extra = ` so hard they bled out. RIP ${randomPerson}`;
  } else {
    extra = ".";
  }
  message.channel.send(`CRACK! ${message.author} just whipped ${randomPerson}` + extra);

};

exports.help = {
  description: "whip someone",
  usage: "!whip"
};
