const config = require("../config.json");

exports.run = async (client, message, args) => {

  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

};

exports.help = {
  description: "Ping the bot.",
  usage: `${config.prefix}ping`
};