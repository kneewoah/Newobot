const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

  client.user.setActivity("Destiny 2", {url: "https://twitch.tv/newox", type: 'STREAMING'})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);

}

exports.help = {
  description: "Newo is live!",
  usage: `${config.prefix}live`
};
