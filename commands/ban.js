const config = require("../config.json");

exports.run = async (client, message, args) => {

  let member = message.mentions.members.first();
  if(!member) return message.reply("Please mention a valid member of this server")
    .then(() => console.log(`Sent a reply to ${message.author.username}: 'Please mention a valid member of this server'`))
    .catch(console.error);

  if(message.author.id === member.id) return message.reply("You can't ban yourself you idiot.")
    .then(() => console.log(`Sent a reply to ${message.author.username}: 'You can't ban yourself you idiot.'`))
    .catch(console.error);

  if(!member.bannable) return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?")
    .then(() => {
      console.log(`Could not ban ${member.username}`);
      console.log(`Sent a reply to ${message.author.username}: 'I cannot ban this user! Do they have a higher role? Do I have ban permissions?'`);
    })
    .catch(console.error);

  let reason = args.slice(0).join(' ');
  if(!reason) reason = config.defaultbanreason;

  await member.ban(reason)
    .then(() => {
      console.log(`Banned member ${member.username}`);
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} for ${reason}`)
      .then(() => console.log(`Sent a reply to ${message.author.username}`))
      .catch(console.error);
    })
    .catch(error => {
      message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}Maybe they have a higher role?`);
      conole.log(error);
    });

};

exports.help = {
  description: "ban a user (Admin+).",
  usage: `${config.prefix}ban <user> <reason>`
};
