//const Commando = require('discord.js-commando');
const Discord = require('discord.js');
//const bot = new Commando.Client({commandPrefix: '$'});
const bot = new Discord.Client();
const STATS_INTERVAL = 3 * 1000;
const prefix = '$';

var cin = 0;

//bot.registry.registerGroup('connectc', 'Connectc');
//bot.registry.registerGroup('defaultc', 'Defaultc');
//bot.registry.registerDefaults();
//bot.registry.registerCommandsIn(__dirname + "/commands")

bot.on('ready', function(){
    console.log("Ready");
    const guild = bot.guilds.get("394805546450026496");
    //console.log(guild);
    var generalChannel = bot.channels.get("542082004821213197"); // Replace with known channel ID
    //generalChannel.send("Hello, world!");
    setInterval(function(){
        // var generalChannel = bot.channels.get("542082004821213197"); // Replace with known channel ID
        //generalChannel.send("Oopps, not here!") ;
        //cin++;
        //var counterc = bot.channels.get("626325593516015616");
        memberCount = guild.members.filter(member => !member.user.bot).size;
        memberCountChannel = bot.channels.get("547805078787194891");
        onlineBotsCount = guild.members.filter(member => member.user.bot).size;
        onlineAllCount = guild.members.filter(m => m.presence.status === 'online').size;
        onlineCount = onlineAllCount - onlineBotsCount;
        onlineCountChannel = bot.channels.get("542346614917038091");
        console.log("MC: " + memberCount + " OBC: " + onlineBotsCount + " OAC: " + onlineAllCount + " OC: " + onlineCount);

        //counterc.setName("🌟Counter: " + cin + " 🌟");
        memberCountChannel.setName("👤Osoby: "+ memberCount +" 👤");
        onlineCountChannel.setName("🔴 Online: "+ onlineCount +" 🔴");

        var rekordChannel = bot.channels.get("542347655389511691");
        var rekordChannelName = rekordChannel.name;
        var splittedRekordChannelName = rekordChannelName.split(" ");
        //console.log(splittedRekordChannelName);
        var irekord = splittedRekordChannelName[2];
        //console.log(irekord);
        if(onlineCount > parseInt(irekord)){
            console.log('>> if(onlineCount > parseInt(irekord)) : true');
            rekordChannelName.setName("🌟 Rekord: " + onlineCount +" 🌟");
        } else{
            console.log('>> if(onlineCount > parseInt(irekord)) : false');
        }
    }, STATS_INTERVAL);
});

bot.on("message", function(message){
    if(message.content.startsWith(prefix)){
        if(message.content.substr(prefix.length) == "stats"){
            message.channel.send("MC: " + memberCount + " OBC: " + onlineBotsCount + " OAC: " + onlineAllCount + " OC: " + onlineCount);
        }
        if(message.content.substr(prefix.length) == "czesc"){
            message.reply('No czesc!');
            message.channel.send('Co tam? ' + message.author + ' Nadal robisz tego bota?');  
        }
        if(message.content.substr(prefix.length) == "join-channel"){
            if(message.member.voiceChannel){
                if(!message.guild.voiceConnection){
                    message.member.voiceChannel.join()
                    .then(connection =>{
                        message.reply('Successfully joined!');
                    })
                }
            } else{
                message.reply('You must be in voice channel');
            } 
        }
    } else{
        //do nothing
    }
});

bot.login(process.env.BOT_TOKEN);