const config = require("../config.json");

exports.run = async (client, message, args) => {

  const m = await message.channel.send("Ping?")
    .then(m => {
      console.log(`Sent message: ${m.content}`);
      m.edit(`Pong! Latency is ${m.createdTimestamp - m.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    })
    .catch(console.error);

  .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
  .catch(console.error);

};

exports.help = {
  description: "Ping the bot",
  usage: `${config.prefix}ping`
};
