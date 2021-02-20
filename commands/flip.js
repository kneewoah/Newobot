const config = require("../config.json");

exports.run = (client, message, args) => {

  var butt = Math.floor(Math.random() * 2) + 1;
  let flip;
  if(butt === 1) {
     flip = "HEADS";
  } if(butt === 2) {
     flip = "TAILS";
  }

  message.channel.send(`https://bit.ly/pillowsbotcoinflip${flip}`);

}

exports.help = {
  description: "Flip a coin.",
  usage: `${config.prefix}flip`
};
