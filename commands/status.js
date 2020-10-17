const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  client.user.setStatus(args[0]);
  message.channel.send("My status has been updated");

};

exports.help = {
  description: "Update the bot's status (Newo Only).",
  usage: `${config.prefix}status [dnd, idle, online]`
};
