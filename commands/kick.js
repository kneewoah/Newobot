const config = require("../config.json");

exports.run = async (client, message, args) => {

  let member = message.mentions.members.first();

  if(!member) return message.reply("Please mention a valid member of this server")
  .then(() => {
    console.log(`${message.author.tag} was unable to kick ${member.user.toString()}`)
    console.log(`Sent a reply to ${message.author.tag}: 'Please mention a valid member of this server'`);
  })
  .catch(console.error);

  if(message.author.id === member.id) return message.reply("you can't kick yourself you idiot.")
  .then(() => {
    console.log(`${message.author.tag} was unable to kick themself`);
    console.log(`Sent a reply to ${message.author.tag}: 'you can't kick yourself you idiot.'`);
  })
  .catch(console.error);

  if(!member.kickable) return message.reply("I cannot kick this user! Do they have a higher role? Do I have ban permissions?")
    .then(() => {
      console.log(`${message.author.tag} was unable to kick ${member.user.toString()}`);
      console.log(`Sent a reply to ${message.author.tag}: 'I cannot kick this user! Do they have a higher role? Do I have ban permissions?'`);
    })
    .catch(console.error);

  let reason;
   if(!args[1]) {
     reason = config.defaultKickReason;
   } else {
     reason = args.splice(0, 1).join(" ");
   };

  await member.kick(reason)
    .then(kicked => console.log(`${message.author.tag} kicked ${kicked.user.tag}`))
    .catch(error => {
      message.reply(`Sorry ${message.author} I couldn't kick the user because of: ${error}`)
    });
  message.reply(`${member.user.tag} has been kicked by ${message.author.tag} for ${reason}`)
    .then(() => console.log(`Sent a reply to ${message.author.tag}: 'you can't kick yourself you idiot.'`)).
    .catch(console.error);

}

exports.help = {
  description: "Kick a user (Mod+).",
  usage: `${config.prefix}kick <user> [reason]`
};
