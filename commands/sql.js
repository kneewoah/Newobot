const config = require("../config.json");

exports.run = async (client, message, args, database) => {

  if (message.author.id !== config.ownerID) return message.channel.send("lol yea no.")

  try {
    database.query(args.join(' '));
  } catch (e) {
    message.channel.send(e);
  }

exports.help = {
  description: "access the SQL database (Newo Only)",
  usage: `!sql <query>`
};
