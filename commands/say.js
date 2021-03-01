const config = require("../config.json");

exports.run = (client, message, args) => {

  const sayMessage = args.join(" ");

  message.channel.send(sayMessage)
    .then(msg => console.log(`Echo'd message ${msg.content}`))
    .catch(console.error);

  message.delete()
    .then(() => console.log(`Deleted my !say message`))
    .catch(console.error);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
