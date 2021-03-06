const config = require("../config.json");

exports.run = async (client, message, args, con) => {

  const sayMessage = args.join(" ");

  message.channel.send(sayMessage)
    .then(msg => console.log(`Echoed message from ${message.author.tag}: ${msg.content}`))
    .catch(console.error);

  await message.delete().catch(console.error);
  console.log(`Deleted my !say message`);

};

exports.help = {
  description: "Make the bot repeat some stuff.",
  usage: `${config.prefix}say <message>`
};
