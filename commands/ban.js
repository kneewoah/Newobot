const config = require("../config.json");

exports.run = async (client, message, args) => {

  let member = message.mentions.members.first();

  if(!member) return message.reply("Please mention a valid member of this server")
    .then(() => {
      console.log(`${message.author.tag} was unable to kick ${member.user.toString()}`)
      console.log(`Sent a reply to ${message.author.tag}: 'Please mention a valid member of this server'`);
    })
    .catch(console.error);

  if(message.author.id === member.id) return message.reply("you can't ban yourself you idiot.")
    .then(() => {
      console.log(`${message.author.tag} was unable to ban themself`);
      console.log(`Sent a reply to ${message.author.tag}: 'you can't ban yourself you idiot.'`);
    })
    .catch(console.error);

  if(!member.bannable) return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?")
    .then(() => {
      console.log(`Attempt to ban ${member.user.tag} by ${message.author.tag} has failed`);
      console.log(`Sent a reply to ${message.author.tag}: 'I cannot ban this user! Do they have a higher role? Do I have ban permissions?'`);
    })
    .catch(console.error);

  let reason = args.slice(0).join(' ');
  if(!reason) reason = config.defaultbanreason;

  await member.ban(reason)
    .then(() => {
      console.log(`Banned member ${member.user.tag}`);
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} for ${reason}`)
      .then(() => console.log(`Sent a reply to ${message.author.tag}`))
      .catch(console.error);
    })
    .catch(error => {
      message.reply(`Sorry ${message.author} I couldn't ban because of : ${error} Maybe they have a higher role?`)
      .then(() => console.log(`Sent a reply to ${message.author.tag}: 'Sorry ${message.author} I couldn't ban because of : ${error} Maybe they have a higher role?'`))
      .catch(console.error);
      conole.log(error);
    });

};

exports.help = {
  description: "ban a user (Admin+).",
  usage: `${config.prefix}ban <user> <reason>`
};
