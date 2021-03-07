const config = require("../config.json");

exports.run = async (client, message, args) => {

  const msg = await message.channel.send("Ping?")
    .then(m => {
      console.log(`Sent message: ${m.content}`);
    })
    .catch(console.error);

  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
    .then(edt => console.log(`Updated the content of a message to ${edt.content}`))
    .catch(console.error);


};

exports.help = {
  description: "Ping the bot",
  usage: `${config.prefix}ping`
};
