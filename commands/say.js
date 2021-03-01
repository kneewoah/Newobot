const config = require("../config.json");

exports.run = (client, message, args) => {

  const sayMessage = args.join(" ");

  message.channel.send(sayMessage)
    .then(msg => console.log(`Echoed message from ${message.author.tag}: ${msg.content}`))
    .catch(console.error);

  message.delete().catch(console.error);
  console.log(`Deleted my !say message`);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
