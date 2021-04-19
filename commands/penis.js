const config = require("../config.json");

exports.run = (client, message, args) => {

  var length = Math.ceil(Math.random()*12);

  var str = `your dick length is ${length} inches\n8`;

  for (var i = 0; i < length; i++) {
    str += "=";
  }

  str += `D`;

  message.reply(str)
    .then(message => console.log(`Sent message: ${message.content}`))
    .catch(console.error);
}

exports.help = {
  description: "gives your penis length",
  usage: `${config.prefix}penis`
};
