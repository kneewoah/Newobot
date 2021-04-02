const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, args) => {

  fs.readdir("./commands", (err, files) => {
      if(err) console.error(err);

      let helpMessage;

      // with args (!help <cmd>)
      if(args[0]) {

        var cmdNameLower = args[0].toLowerCase()
        if (args[0].indexOf(config.prefix) === 0) {
          cmdNameLower = args[0].slice(1, args[0].length).toLowerCase();
        };

        try {

          var cmdFile2 = require(`./${cmdNameLower}.js`)
          var cmdDesc = cmdFile2.help.description;
          var cmdUsage = cmdFile2.help.usage;
          helpMessage = `\`Newo Bot Commands\`\n__Command__: **${cmdNameLower}**\n__Description__: ${cmdDesc}\n__Usage__: ${cmdUsage}`;

        } catch (e) {
          message.channel.send(`\'${cmdNameLower}\' is not a valid command`)
          .then(message => console.log(`Sent message: ${message.content}`))
          .catch(console.error);
        };



      // no args
      } else {
        let cmdArray = files.filter(f => f.split(".").pop() === "js").sort().map(function(cmd) {return cmd.slice(0, cmd.length - 3)}).map(x => [x]);

        var embed = new Discord.MessageEmbed({title: `Newo Bot Commands`, color: `#FFFFFF`});
        console.log(`Help Embed created`)

        cmdArray.forEach(element => embed.addField(`**${element[0]}**`, `${require(`./${element[0]}.js`).help.description}\n${require(`./${element[0]}.js`).help.usage}`))
        
        helpMessage = embed;
      }

       // send dm
        try {
            message.author.send(helpMessage)
            .then(msg => console.log(`Private Messaged ${message.author.tag}: ${msg.content}`))
          } catch (err) {
            console.log(`Failed to send a help dm to ${message.author.tag}`);
            message.reply("sorry, I can't help because you blocked me.")
            .then(() => console.log(`Sent a reply to ${message.author.tag}`))
            .catch(console.error);
          }
    });

};

exports.help = {
  description: "This command.",
  usage: `${config.prefix}help [command]`
};
