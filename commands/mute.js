const config = require("../config.json");

exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR") || message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

  if(!message.guild.roles.cache.find(role => role.name === "Muted")) {
    message.guild.roles.create({
      data: {
        name: 'Muted',
        color: '0xb51515',
        hoist: false,
        mentionable: false,
        permissions: ["READ_MESSAGE_HISTORY", "SPEAK", "USE_VAD", "CHANGE_NICKNAME"]
      },
      reason: "New Muted Role"
    });
    message.channel.send("Because there was no `muted` role, I've gone ahead and created one for you.");
  }

  let rb = message.mentions.members.first();
  if(!rb) message.reply("you need to mention a user")

  let role = message.guild.roles.cache.find(role => role.name === "Muted");

  if(message.author.id === rb.id) {
      message.reply("you can't mute yourself, idiot.");
  } else if(rb.roles.cache.find(role => role.name === "Muted")) {
      message.reply(rb + " is already muted you mormon.");
  } else {
    message.reply(rb + " has been muted.");
    await rb.roles.add(role.id)
          .catch(error => message.reply(`Sorry ${message.author} I couldn't unmute because of : ${error}. Maybe they have a higher role?`));
  }

};

exports.help = {
  description: "Mute a user (Mod+).",
  usage: `${config.prefix}mute <user>`
};
