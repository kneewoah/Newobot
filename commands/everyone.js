const config = require("../config.json");

exports.run = (client, message, args) => {

  if(message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");

  let msg = args.slice(0).join(' ');
  var memberList = message.guild.members.cache;

  var failedUserTags = [];
  memberList.forEach(member => {
      member.send(msg).catch(() => failedUserTags.push(member.user.tag));
  });

  console.log(`Failed to send DMs to ${failedUserTags.length} users: ${failedUserTags.toString()}`);

  message.reply(`I have attempted to send messages to ${memberList.length} users`)
    .then(message => console.log(`Sent a reply: ${message.content}`))
    .catch(console.error);

  message.channel.send(`The following users did not recieve a DM: ${failedUserTags.toString()}`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

};

exports.help = {
  description: "Sends a DM to all users from the bot (Newo Only).",
  usage: `${config.prefix}everyone <message>`
};
