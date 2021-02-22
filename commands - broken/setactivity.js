const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

  var query = args.join(' ');

  client.user.setActivity(query);

  message.channel.send("My activity has been updated to \'" + query + "\'");

}

exports.help = {
  description: "Change the actvity the bot is doing.",
  usage: `${config.prefix}game [playing, listening, watching] <message>`
};
