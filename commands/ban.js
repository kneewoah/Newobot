const config = require("../config.json");

exports.run = async (client, message, args) => {

  let member = message.mentions.members.first();
  if(!member) return message.reply("Please mention a valid member of this server");
  if(message.author.id === member.id) return message.reply("you can't ban yourself you idiot.");
  if(!member.bannable) return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

  let reason = args.slice(0).join(' ');
  if(!reason) reason = "having an ugly face";

  await member.ban(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}Maybe they have a higher role?`));
  message.reply(`${member.user.tag} has been banned by ${message.author.tag} for ${reason}`);

};

exports.help = {
  description: "ban a user (Admin+).",
  usage: `${config.prefix}ban <user> <reason>`
};
