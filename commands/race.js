const config = require("../config.json");

exports.run = (client, message, args, con) => {

  var msg = "";
  let races = Object.assign({}, config.races);
  let size = races.length;
  var remaining = 100;

  for (var i = 0; i < size; i++) {
    var index = Math.floor(Math.random()*races.length);
    var percent = Math.floor(Math.random()*remaining);
    if (percent < 1) percent = "<1";
    console.log(`Percent ${i+1}: ${percent});
    msg = msg + `${races[index]}: ${percent}%\n`;
    races.splice(index, 1);
    remaining -= percent;

  }

  message.channel.send(`${message.author}, after conducting DNA analysis, I have concluded your race to be as follows:\n\n` + msg);

};

exports.help = {
  description: "WIP - XP tracker",
  usage: "!xp"
};
