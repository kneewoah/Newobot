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
          message.author.send(`\`Newo Bot Commands\`\n__Command__: **${cmdNameLower}**\n__Description__: ${cmdDesc}\n__Usage__: ${cmdUsage}`)
            .then(msg => console.log(`Private Messaged ${message.author.tag}: ${msg.content}`))
            .catch(err => {
              if (!sentblocked) {
                sentblocked = true;
                message.reply("sorry, I can't help because you blocked me.")
                .then(() => console.log(`Sent a reply to ${message.author.tag}`))
                .catch(console.error);
              }
            });

        } catch (e) {
          message.channel.send(`\'${cmdNameLower}\' is not a valid command`)
          .then(message => console.log(`Sent message: ${message.content}`))
          .catch(console.error);
        };



      // no args
      } else {
        let cmdArray = files.filter(f => f.split(".").pop() === "js").sort().map(function(cmd) {return cmd.slice(0, cmd.length - 3)}).map(x => [x]);

        var embeds = [];

        for (var i = 0; i < Math.round(cmdArray.length / 25) + 1; i++) {
          embeds.push(new Discord.MessageEmbed({title: `Newo Bot Commands - Page ${i+1}/${Math.round(cmdArray.length / 25) + 1}`, color: `#FFFFFF`}));
          for (var j = 25*i; (j < 25*(i+1)) && (j < cmdArray.length); j++) {
            embeds[i].addField(`**${cmdArray[j][0]}**`, `${require(`./${cmdArray[j][0]}.js`).help.description}\n${require(`./${cmdArray[j][0]}.js`).help.usage}`);
          }
        }
        console.log(`Help embeds created`);
      }

      var sentblocked = false;
      embeds.forEach(embed => message.author.send(embed).then(msg => console.log(`Private Messaged ${message.author.tag}: ${msg.content}`))
        .catch(err => {
          if (!sentblocked) {
            sentblocked = true;
            message.reply("sorry, I can't help because you blocked me.")
            .then(() => console.log(`Sent a reply to ${message.author.tag}`))
            .catch(console.error);
          }

        })
      );

  });

};

exports.help = {
  description: "This command.",
  usage: `${config.prefix}help [command]`
};
