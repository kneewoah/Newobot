const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  let style = args[0].toLowerCase();
  let text;
  if (style === "watching" || query === "streaming" ||  query === "listening" || query === "playing") {
    text = args.slice(1).join(' ');
    client.user.setActivity(text, { type: style });
  } else {
    text = args.join(' ');
    client.user.setActivity(text);
  }

  message.channel.send("My activity has been updated");

}

exports.help = {
  description: "Change the actvity the bot is doing.",
  usage: `${config.prefix}setactivity [playing, listening, watching, streaming] <message>`
};
