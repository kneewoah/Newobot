const config = require("../config.json");

exports.run = async (client, message, args) => {

  if (!args[0]) message.channel.send("Please select a color here: <https://htmlcolorcodes.com/color-picker/>. Then, you may type \`!color #URCODE\`");

  var mAuthor = message.author;
  console.log("Editing color for" + mAuthor.id);

  if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0].substring(1), mAuthor);
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0], mAuthor);
  } else {
    message.channel.send("The code you entered did not match the correct format. You can select a color here: <https://htmlcolorcodes.com/color-picker/>");
  }

function changeColor(color, author) {
  deleteRole(author);
  setTimeout(function() {makeRole(color, author)}, 400);
  setTimeout(function() {addRole(author)}, 1600);
};

function deleteRole(author) {
  if (message.guild.roles.cache.find(role => role.name === author.id)) {
    message.guild.roles.cache.find(role => role.name === author.id).delete();
  }
  console.log(author.id + " deleted");
};

function makeRole(color, author) {
  message.guild.roles.create({
    data: {
      name: `${author.id}`,
      color: `0x${color}`,
      hoist: false,
      mentionable: false,
    },
    reason: `!color command for ${author.username}`
  });

  console.log(author.id + " created");
};

function addRole(user) {
  let roleID = message.guild.roles.cache.find(role => role.name === user.id).id;
  message.member.roles.add(roleID);
  console.log(roleID + " added");
};

};

exports.help = {
  description: "Get a custom role color in discord",
  usage: "!color #HEX43F"
};
