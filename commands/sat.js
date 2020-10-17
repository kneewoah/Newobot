const config = require("../config.json");

exports.run = (client, message, args) => {

  if (args.length < 1) return message.channel.send("Please enter a school name");

  var score = Math.floor(Math.random()*121 + 40)*10;

  message.channel.send(`${message.author}, your next SAT score will be a ${score}.`);

};

exports.help = {
  description: "what is my SAT score?",
  usage: "!SAT"
};
