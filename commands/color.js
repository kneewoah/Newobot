const config = require("../config.json");

exports.run = async (client, message, args) => {

  if (!args[0]) message.channel.send("Please select a color here: <https://htmlcolorcodes.com/color-picker/>. Then, you may type \`!color #URCODE\`");

  var mAuthor = message.author;
  console.log("Editing color for " + mAuthor.id);

  if (args[0].toLowerCase() === "random") {
    changeColor(Math.floor(Math.random()*16777215).toString(16), mAuthor);
  } else if (args[0].toLowerCase() === "def" || args[0].toLowerCase() === "default") {
    changeColor("000000", mAuthor);
  } else if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0].substring(1), mAuthor);
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0], mAuthor);
  } else {
    message.channel.send("The code you entered did not match the correct format. You can select a color here: <https://htmlcolorcodes.com/color-picker/>");
  }

  function changeColor(color, author) {
    if (!message.guild.roles.cache.find(role => role.name === author.id)) {
      message.member.roles.add(
        message.guild.roles.create({
        data: {
          name: `${author.id}`,
          color: `0x${color}`,
          hoist: false,
          mentionable: false,
        },
        reason: `!color command for ${author.username}`
      }));
    } else {
      var edited = message.guild.roles.cache.find(role => role.name === author.id).edit({color: `0x${color}`}).then(r => message.member.roles.add(r));
    }
  };
}

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F or !color random"
};
