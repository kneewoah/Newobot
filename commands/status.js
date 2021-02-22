const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  var query = args[0].toLowercase();
  if (query != 'online' || query != 'dnd' || query != 'idle' || query != 'invisible') {
    return message.reply("Please enter a valid status: \`online | idle | dnd | invisible\`")
  } else {
    client.user.setStatus(args[0]);
    message.channel.send("My status has been updated to + " args[0]);
  }


};

exports.help = {
  description: "Update the bot's status (Newo Only).",
  usage: `${config.prefix}status [dnd, idle, online, invisible]`
};
