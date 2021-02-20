const config = require("../config.json");

exports.run = (client, message, args) => {
  var input = args.join(" ")
  var x;
  try {
    x = eval(input);
    message.channel.send(input + ` = ` + x);
  } catch (e) {
    message.channel.send(`Sorry ${message.author}, I can't do that :/`);
    console.log(e);
  }

};

exports.help = {
  description: "calculator maybe",
  usage: "!fuck"
};
