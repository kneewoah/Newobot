const config = require("../config.json");

exports.run = async (client, message, args) => {

  let member = message.mentions.members.first();
  if(!member) return message.reply("Please mention a valid member of this server");
  if(message.author.id === member.id) return message.reply("you can't kick yourself you idiot.");
  if(!member.kickable) return message.reply("I cannot kick this user! Do they have a higher role? Do I have ban permissions?");

  let reason;
   if(!args[1]) {
     reason = "being a faggot";
   } else {
     reason = args.splice(0, 1).join(" ");
   };

  await member.kick(reason)
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick the user because of : ${error}`));
  message.reply(`${member.user.tag} has been kicked by ${message.author.tag} for ${reason}`);

}

exports.help = {
  description: "Kick a user (Mod+).",
  usage: `${config.prefix}kick <user> <reason>`
};
