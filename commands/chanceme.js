const config = require("../config.json");

exports.run = (client, message, args) => {

  if (args.length < 1) return message.channel.send("Please enter a school name")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  var chance = Math.floor(Math.random()*101)
  var school = args.join(" ");

  message.channel.send(`${message.author}, you have a ${chance} percent chance at getting into ${school}.`)
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

};

exports.help = {
  description: "how likely you are to get into a school",
  usage: "!chanceme <school>"
};
