const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  let style = args[0];
  let playing = args.slice(1).join(' ');
  client.user.setActivity(playing, { type: style });
  message.channel.send("My activity has been updated");

}

exports.help = {
  description: "Change the actvity the bot is doing.",
  usage: `${config.prefix}game [playing, listening, watching] <message>`
};
