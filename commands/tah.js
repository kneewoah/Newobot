const config = require("../config.json");

exports.run = (client, message, args, database) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  let style = args[0].toUpperCase();
  let text;
  if (style === "WATCHING" || style === "LISTENING" || style === "PLAYING") {
    if (args[1]) {
      text = args.slice(1).join(' ');
      client.user.setActivity(text, { type: style })
      .then(presence => console.log(`Activity set to ${presence.type} ${presence.activities[0].name}`))
      .catch(console.error);

      message.channel.send("My activity has been updated to " + style + " " + text)
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    } else {
      client.user.setPresence({status: style })
        .then(presence => console.log(`Status set to ${presence.status}`))
        .catch(console.error);

      message.channel.send("My status has been updated to " + style + "Newo")
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    }
  } else {
    text = args.join(' ');
    client.user.setActivity(text)
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);

    message.channel.send("My activity has been updated to " + text)
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);
  }

}

exports.help = {
  description: "Change the task-at-hand the bot is doing.",
  usage: `${config.prefix}tah [playing, listening, watching, streaming} <message>`
};
