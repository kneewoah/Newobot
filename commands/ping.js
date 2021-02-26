const config = require("../config.json");

exports.run = async (client, message, args) => {

  const m = await message.channel.send("Ping?")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
  .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
  .catch(console.error);

};

exports.help = {
  description: "Ping the bot",
  usage: `${config.prefix}ping`
};
