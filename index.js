const Commando = require('discord.js-commando');
const bot = new Commando.Client();
const cmdp = 'v!';

bot.registry.registerGroup('connectc', 'Connectc');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")

bot.on('ready', function(){
    console.log("Ready");
});

bot.on("message", function(message){
    if(message.content == cmdp + 'czesc'){
        message.reply('No czesc!');
        message.channel.send('Co tam? ' + message.author + ' Nadal robisz tego bota?');
    }
});

bot.login(process.env.BOT_TOKEN);
