const config = require("../config.json");

exports.run = (client, message, args) => {

  const sayMessage = args.join(" ");
  message.delete().catch(O_o=>{});

  message.channel.send(sayMessage)
  .then(message => console.log(`Echo'd message from ${message.author.tag}: ${message.content}`))
  .catch(console.error);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
