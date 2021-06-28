const config = require("../config.json");

exports.run = async (client, message, args, database) => {

  if (!args[0]) message.channel.send("Please select a color here: <https://htmlcolorcodes.com/color-picker/>. Then, you may type \`!color #URCODE\`")
  .then(message => console.log(`Sent message: ${message.content}`))
  .catch(console.error);

  var mAuthor = message.author;
  console.log("Editing color for " + mAuthor.id + "...");

  if (args[0].toLowerCase() === "random") {
    changeColor(Math.floor(Math.random()*16777215).toString(16), mAuthor);
  } else if (args[0].toLowerCase() === "def" || args[0].toLowerCase() === "default") {
    changeColor("000000", mAuthor);
  } else if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0].substring(1), mAuthor);
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0], mAuthor);
  } else {
    message.channel.send("The code you entered did not match the correct format. You can select a color here: <https://htmlcolorcodes.com/color-picker/>")
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
  }

  function changeColor(color, author) {
    const role = require(`../modules/roleColor.js`).run(client, database, message.guild.member(author), undefined, "!color command");
    role.edit({color: `0x${color}`}, `Newo Bot - !color ${color}`)
    .then(updated => console.log(`Edited role color for ${author.tag} to ${updated.color}`))
    .catch(console.error);
  }
};

exports.help = {
  description: "Get a custom role color in discord",
  usage: `${config.prefix}color <#HEXCODE | default | random>`
};
