const config = require("../config.json");

exports.run = (client, message, args) => {

require(`../modules/xpResets.js`).weekly(client, database);

};

exports.help = {
  description: "how likely you are to get into a school",
  usage: `${config.prefix}chanceme <school>`
};
