const config = require("../config.json");

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR") || message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

  let rb = message.mentions.members.first();
  let role = message.guild.roles.find(role => role.name === "Muted");
  if(message.author.id === rb.id) {
    message.reply("why are you trying to unmute yourself?");
  } else if(!rb.roles.find(role => role.name === "Muted")) {
    message.reply(rb + " isn't even muted you mormon.");
  } else {

    message.reply(rb + " has been unmuted.");

    await rb.removeRole(role.id)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't unmute because of : ${error}`));
  }

};

exports.help = {
  description: "Unmute someone (Mod+).",
  usage: `${config.prefix}unmute <user>`
};
