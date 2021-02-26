const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

  var query = args[0].toLowerCase();

  if (query === "dnd" || query === "idle" ||  query === "online" || query === "invisible") {
    client.user.setStatus(query)
      .then(presence => console.log(`Status set to ${presence.status}`))
      .catch(console.error);
    message.channel.send("My status has been updated to " + query)
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);
  } else {
    console.log(`${message.author.tag} did not enter a valid status`)
    message.reply("Please enter a valid status: \`online | idle | dnd | invisible\`")
      .then(() => console.log(`Sent a reply to ${message.author.tag}: 'Please enter a valid status: \`online | idle | dnd | invisible\`'`))
      .catch(console.error);
    return;
  }


};

exports.help = {
  description: "Update the bot's status (Newo Only).",
  usage: `${config.prefix}status {dnd, idle, online, invisible}`
};
