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
  let pos = deleteRole(author);
  setTimeout(function() {makeRole(color, author, pos)}, 400);
  setTimeout(function() {addRole(author)}, 1600);
};

function deleteRole(author) {
  if (message.guild.roles.cache.find(role => role.name === author.id)) {
    let role = message.guild.roles.cache.find(role => role.name === author.id)
    let pos = role.position;
    role.delete();
    return pos;
    console.log(author.id + " deleted");
  } else {
    return 0;
  }
};

function makeRole(color, author, pos) {
  message.guild.roles.create({
    data: {
      name: `${author.id}`,
      color: `0x${color}`,
      hoist: false,
      mentionable: false,
      position: pos,
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
