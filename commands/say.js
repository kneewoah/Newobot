const config = require("../config.json");

exports.run = (client, message, args) => {

  const sayMessage = args.join(" ");
  message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.tag}`))
    .catch(console.error);

  message.channel.send(sayMessage)
  .then(message => console.log(`Echo'd message from ${message.author.tag}: ${message.content}`))
  .catch(console.error);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
