const config = require("../config.json");

exports.run = (client, message, args, con) => {

  var msg = "";
  let races = JSON.parse(JSON.stringify(config.races));
  let size = races.length;
  var remaining = 100;
  var percents = [];

  for (var i = 0; i < size; i++) {
    var percent = Math.floor(Math.random()*remaining);
    var percent2 = percent;
    if (percent < 1) percent2 = Math.random();
    percents.push(percent2);
    remaining -= percent;
  }

  for (i = races.length -1; i > 0; i--) {
    j = Math.floor(Math.random() * i)
    k = races[i]
    races[i] = races[j]
    races[j] = k
  }
  console.log(races)

  percents.sort(function(a, b){return a-b});
  console.log(percents);

  var params = {type:'pie',data:{labels:[races],datasets:[{data:[percents]}]}};
  console.log(params);
  console.log(`https://quickchart.io/chart?c=${params}`);
    
  message.channel.send(`${message.author}, after conducting DNA analysis, I have concluded your race to be as follows:`, {files: [`https://quickchart.io/chart?c=${params}`]});
};

exports.help = {
  description: "DNA Analysis",
  usage: "!race"
};
