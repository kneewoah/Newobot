const config = require("../config.json");

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR") || message.author.id !== config.ownerID) return message.channel.send("You do not have permission to execute this command.")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

  const deleteCount = parseInt(args[0], 10) + 1;

  if(!deleteCount || deleteCount < 3 || deleteCount > 100) {
  return message.reply("Please provide a number between 2 and 99 for the number of messages to delete")
    .then(() => console.log(`Sent a reply to ${message.author.tag}: 'Please provide a number between 2 and 100 for the number of messages to delete'`))
    .catch(console.error);
  }

  const fetched = await message.channel.messages.fetch({limit: deleteCount});
  console.log(`Fetched ${fetched.size} messages in ${message.channel.name}`)
  message.channel.bulkDelete(fetched)
    .then(msgs => console.log(`Deleted ${msgs.size} messages in ${message.channel.name}`))
    .catch(error => {
      console.log(`Couldn't delete ${fetched.size} messages because of: ${error}`);
      message.reply(`Couldn't delete ${fetched.size} messages because of: ${error}`)
        .then(() => console.log(`Sent a reply to ${message.author.tag}: 'Couldn't delete ${fetched.size} messages because of: ${error}'`))
        .catch(console.error);
  });
};

exports.help = {
  description: "Purge a lot of messages (Mod+).",
  usage: `${config.prefix}purge <amount>`
};
