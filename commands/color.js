const config = require("../config.json");

exports.run = async (client, message, args) => {

  if (!args[0]) message.channel.send("Please select a color here: <https://htmlcolorcodes.com/color-picker/>. Then, you may type \`!color #URCODE\`");

  var mAuthor = message.author;
  console.log(mAuthor.id);

  if (args[0].match(/^#(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0].substring(1), mAuthor);
  } else if (args[0].match(/^(?:[0-9a-fA-F]{6})$/g)) {
    changeColor(args[0], mAuthor);
  } else {
    message.channel.send("The code you entered did not match the correct format. You can select a color here: <https://htmlcolorcodes.com/color-picker/>");
  }

function changeColor(color, author) {
  deleteRole(author.id);
  setTimeout(function() {makeRole(color, author.id)}, 400);
  setTimeout(function() {addRole(author)}, 1600);
};

function deleteRole(roleName) {
  if (message.guild.roles.cache.find(role => role.name === roleName)) {
    message.guild.roles.cache.find(role => role.name === roleName).delete();
  }
  console.log(roleName + " deleted");
};

function makeRole(color, id) {
  message.guild.roles.create({
    name: `${id}`,
    color: `0x${color}`,
    hoist: false,
    mentionable: false,
  });
  console.log(id + " created");
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
