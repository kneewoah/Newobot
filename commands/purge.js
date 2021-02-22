const config = require("../config.json");

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR") || message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.");
  const deleteCount = parseInt(args[0], 10) + 1;

  if(!deleteCount || deleteCount < 3 || deleteCount > 101) {
  return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
  }

  const fetched = await message.channel.messages.fetch({limit: deleteCount});
  message.channel.bulkDelete(fetched).catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
};

exports.help = {
  description: "Purge a lot of messages (Mod+).",
  usage: `${config.prefix}purge <amount>`
};
