const config = require("../config.json");

exports.run = (client, message, args) => {

  const members = message.guild.members.cache.filter(guildMember => !guildMember.user.bot);
  const other = members.random().user
  const p2 = other.username
  const p1 = message.author.username;
  const time = Math.floor(Math.random()*30);
  const num = Math.ceil(Math.random()*100);
  var name = (p1.substring(0, Math.floor(Math.random()*(p1.length-1))+1) + p2.substring(Math.floor(Math.random()*(p1.length-1))));
  name = name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase();

  var str = `${message.author} was getting pretty horny with ${other}, so they decided to make a baby. ${p1} lasted for ${time} long minutes!!`;

  if (num < 3) {
    str += ` Unfortunately, ${p2} had a miscarriage in the first trimester`;
  } else if (num < 99) {
    str += ` 9 months later, the baby was a ${Math.floor(Math.random()*2) == 0 ? "boy" : "girl"}!`;
    if (num > 96) {
      str += ` As ${p2} died in childbirth, the name ${name} was given to the child.`;
    } else if (num > 50) {
      str += ` ${p1} chose the name ${name} for the child.`;
    } else {
      str += ` ${p2} chose the name ${name} for the child.`;
    } if (num % 5 == 0) {
      str += ` Both ${p1} and ${p2} were very proud of ${name}.`;
    }if (num % 30 == 0) {
      str += ` Sadly, ${name} was born with severe autism.`;
    } if (num % 20 == 0) {
      str += ` And due to complications with heart surgery, ${name} died at age 4.`;
    }

  } else {
    str += ` Unfortunately, ${p2} was killed in an accident before the baby was born and the paramedics could not save the fetus.`;
  }
  str += ` The end.`;

  message.channel.send(str)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);

}

exports.help = {
  description: "allows you to experience sex",
  usage: `${config.prefix}sex`
};
