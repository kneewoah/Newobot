const Discord = require('discord.js');
const config = require("../config.json");
const fs = require("fs");

exports.run = (client, message, args) => {

  fs.readdir("./commands", (err, files) => {
      if(err) console.error(err);

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

        } catch (e) {
          message.channel.send(`\'${cmdNameLower}\' is not a valid command`);
        };

      // no args
      } else {
        let cmdArray = files.filter(f => f.split(".").pop() === "js").sort().map(function(cmd) {return cmd.slice(0, cmd.length - 3)}).map(x => [x]);

        var embed = new Discord.MessageEmbed({
          title: `Newo Bot Commands`, color: `#FFFFFF`});

        cmdArray.forEach(element => embed.addField(element[0], `Description: ${require(`./${element[0]}.js`).help.description}`, `Usage: ${require(`./${element[0]}.js`).help.usage}`))

        message.author.send(embed);
      }



    });

};

exports.help = {
  description: "This command.",
  usage: `${config.prefix}help`
};
