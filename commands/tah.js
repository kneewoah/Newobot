const config = require("../config.json");

exports.run = (client, message, args, database) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  let style = args[0].toUpperCase();
  let text;
  if (style === "WATCHING" || style === "LISTENING" || style === "PLAYING") {
    if (args[1]) {
      text = args.slice(1).join(' ');
      client.user.setActivity(text, { type: style });
      message.channel.send("My activity has been updated to " + style + " " + text);
    } else {
      client.user.setPresence({status: style });
      message.channel.send("My status has been updated to " + style + "Newo");
    }
  } else {
    text = args.join(' ');
    client.user.setActivity(text);
    message.channel.send("My activity has been updated to " + text);
  }

}

exports.help = {
  description: "Change the task-at-hand the bot is doing.",
  usage: `${config.prefix}tah [playing, listening, watching, streaming] <message>`
};
