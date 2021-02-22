const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  var query = args[0].toLowerCase();

  message.reply(args[0]);

  if (query === "dnd" || query === "idle" ||  query === "online" || query === "invisible") {
    client.user.setStatus(query);
    message.channel.send("My status has been updated to " + query);
  } else {
    return message.reply("Please enter a valid status: \`online | idle | dnd | invisible\`");
  }


};

exports.help = {
  description: "Update the bot's status (Newo Only).",
  usage: `${config.prefix}status [dnd, idle, online, invisible]`
};
