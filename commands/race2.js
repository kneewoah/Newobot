const Discord = require('discord.js');
const config = require("../config.json");

exports.run = (client, message, args, con) => {

  let races = JSON.parse(JSON.stringify(config.races));
  let size = races.length;
  var remaining = 100;
  var percents = [];

  for (var i = 0; i < size; i++) {
    var percent = Math.floor(Math.random()*remaining);
    var percent2 = percent;
    percents.push(percent2);
    remaining -= percent;
  }

  // sort
  for (i = races.length -1; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    k = races[i]
    races[i] = races[j]
    races[j] = k
  }

  percents.sort(function(a, b){return a-b});

  message.channel.send(`${message.author}, after conducting DNA analysis, I have concluded your race to be as follows:`)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
  const embed = new Discord.MessageEmbed()
	 .setImage(`https://quickchart.io/chart?c={type:'pie',data:{labels:${JSON.stringify(races)},datasets:[{data:[${percents}]}]}}`);
  message.channel.send(embed)
    .then(message => console.log(`Sent embed with image ${embed.image.url}`))
    .catch(console.error);

};

exports.help = {
  description: "DNA Analysis",
  usage: `${config.prefix}race`
};
