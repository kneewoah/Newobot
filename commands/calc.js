const config = require("../config.json");

exports.run = (client, message, args, database) => {
  var input = args.join(" ")
  var x;
  try {
    console.log(`Evaluating ${input}...`);
    x = eval(input);
    console.log(`${input} evaluates to ${x}`);
    message.channel.send(input + ` = ` + x)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
  } catch (e) {
    message.channel.send(`Sorry ${message.author}, I can't do that :/`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
    console.log(e);
  }

};

exports.help = {
  description: "calculator maybe",
  usage: `${config.prefix}calc <basic math>`
};
