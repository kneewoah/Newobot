const config = require("../config.json");

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR") || message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

  let rb = message.mentions.members.first();
  let role = message.guild.roles.cache.find(role => role.name === "Muted");
  if(message.author.id === rb.id) {
    message.reply("why are you trying to unmute yourself?")
      .then((message) => console.log(`Sent a reply to ${message.author.tag}: ${message.content}`))
      .catch(console.error);
  } else if(!rb.roles.cache.find(role => role.name === "Muted")) {
    message.reply(rb + " isn't even muted you mormon.")
      .then((message) => console.log(`Sent a reply to ${message.author.tag}: ${message.content}`))
      .catch(console.error);
  } else {

    message.reply(rb.toString() + " has been unmuted.");

    await rb.roles.remove(role.id, "Unmute")
      .then(() => console.log(`Removed the muted role from ${rb.user.tag}`))
      .catch(error => message.reply(`Sorry ${message.author} I couldn't unmute because of : ${error}`)
        .then((message) => console.log(`Sent a reply to ${message.author.tag}: ${message.content}`))
        .catch(console.error));
  }

};

exports.help = {
  description: "Unmute someone (Mod+).",
  usage: `${config.prefix}unmute <user>`
};
