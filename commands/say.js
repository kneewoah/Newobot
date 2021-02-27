const config = require("../config.json");

exports.run = (client, message, args) => {

  const sayMessage = args.join(" ");
  const chan = message.channel

  message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.tag}`))
    .catch(console.error);

  chan.send(sayMessage)
  .then(msg => console.log(`Echo'd message from ${msg.author.tag}: ${msg.content}`))
  .catch(console.error);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
