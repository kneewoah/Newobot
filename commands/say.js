const config = require("../config.json");

exports.run = (client, message, args) => {

  const sayMessage = args.join(" ");
  const chan = message.channel;
  const author = message.author;

  message.channel.send(sayMessage)
  .then(msg => console.log(`Echo'd message from ${author.tag}: ${msg.content}`))
  .catch(console.error);

  message.delete()
    .then(msg => console.log(`Deleted message from ${author.tag}`))
    .catch(console.error);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
