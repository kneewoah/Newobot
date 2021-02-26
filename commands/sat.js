const config = require("../config.json");

exports.run = (client, message, args) => {

  var score = Math.floor(Math.random()*121 + 40)*10;

  message.channel.send(`${message.author}, your next SAT score will be a ${score}.`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

};

exports.help = {
  description: "what is my SAT score?",
  usage: `${config.prefix}sat`
};
