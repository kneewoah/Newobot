const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

  let msg = args.slice(0).join(' ');
  var memberList = message.guild.members.array();

  memberList.forEach(member => member.send(msg));

  message.reply(`I have attempted to send messages to ${memberList.length} users`);

};

exports.help = {
  description: "Sends a DM to all users from the bot (Newo Only).",
  usage: `${config.prefix}everyone <message>`
};
