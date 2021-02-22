const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

  client.user.setActivity("Destiny 2", {url: "https://twitch.tv/newox", type: 'PLAYING'});

}

exports.help = {
  description: "Newo is live!",
  usage: `!live`
};
