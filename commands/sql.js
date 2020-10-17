const config = require("../config.json");

exports.run = async (client, message, args, database) => {

  if (message.author.id !== config.ownerID) return message.channel.send("lol yea no.")
  var query = args.join(' ');
  if (query == "") return message.channel.send("u gotta put in a query bro")

  try {
    database.query(query);
  } catch (e) {
    message.channel.send(e);
  }
}

exports.help = {
  description: "access the SQL database (Newo Only)",
  usage: `!sql <query>`
};
