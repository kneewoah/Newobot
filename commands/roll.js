const config = require("../config.json");

exports.run = (client, message, args) => {

  let number = parseInt(args[0], 10);

  if(number < 1 || number > 100) {
    console.log(`Failed to process roll. ${number} is an invalid parameter`)
    message.reply("You did not specify a valid number of sides. Choose 1-100, or leave blank for 6.")
      .then(() => console.log(`Sent a reply to ${message.author.tag}: 'You did not specify a valid number of sides. Choose 1-100, or leave blank for 6.'`))
      .catch(console.error);
    return;
  }

  let sides;
  if(!args[0]) {
    sides = 6;
  } else {
    sides = number
  }

   const roll = Math.floor(Math.random() * sides) + 1;

   let rolling = "🔹      |   **Rolling**...   |      🔹\n**==================**\n➡️ | ";
   let rolling2 = "  | ⬅️";

   message.channel.send(`${rolling}🎲⚫⚫⚫⚫${rolling2}`)
       .then((msg)=>{setTimeout(function() {{setTimeout(function() {{setTimeout(function() {{setTimeout(function() {{setTimeout(function() {
       msg.edit("🔹      |     **Rolled**     |      🔹\n**==================**\n➡️      |   ➖ **" + roll + "** ➖   |     ⬅️");
       }, 1000)}
       msg.edit(`${rolling}⚫⚫⚫⚫🎲${rolling2}`);
       }, 1000)}
       msg.edit(`${rolling}⚫⚫⚫🎲⚫${rolling2}`);
       }, 1000)}
       msg.edit(`${rolling}⚫⚫🎲⚫⚫${rolling2}`);
       }, 1000)}
       msg.edit(`${rolling}⚫🎲⚫⚫⚫${rolling2}`);
      }, 1000);
        console.log(`Sent message & edited dice message`);
      })
      .catch(console.error);

};

exports.help = {
  description: "Roll a die.",
  usage: `${config.prefix}roll []# of sides]`
};
