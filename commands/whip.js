const config = require("../config.json");

exports.run = async (client, message, args) => {

  const members = await message.guild.members.cache.filter(guildMember => !guildMember.user.bot);
  const person = members.random().user;

  let extra;
  if ((Math.floor(Math.random()*10)) < 1) {
    extra = ` so hard they bled out. RIP ${randomPerson}`;
  } else {
    extra = ".";
  }

  message.channel.send(`CRACK! ${message.author} just whipped ${person}` + extra)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

};

exports.help = {
  description: "whip someone",
  usage: `${config.prefix}whip`
};
