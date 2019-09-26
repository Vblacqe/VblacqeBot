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
        var messageSubstr = message.content.substr(prefix.length);
        var messageList = messageSubstr.split(" ");
        console.log(messageList);
        var cmd = messageList[0];
        var args = [0];
        if(messageList.length > 1){
            var iargs = 1;
            while(iargs < messageList.length){
                var iargsi = iargs - 1;
                args[iargsi] = messageList[iargs];
                console.log(args[iargsi]);
                iargs++;
            }
        }
        console.log(args);
        if(cmd == "stats"){
            message.channel.send("MC: " + memberCount + " OBC: " + onlineBotsCount + " OAC: " + onlineAllCount + " OC: " + onlineCount);
        }
        if(cmd == "czesc"){
            message.reply('No czesc!'); 
        }
        if(cmd == "join-channel"){
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
        if(cmd == "repeat"){
            var irepeat = 0;
            console.log("REPEAT: " + args);
            while(irepeat < args.length){
                message.channel.send(args[irepeat]);
                irepeat++;
            }
        }
    } else{
        //do nothing
    }
});

bot.login(process.env.BOT_TOKEN);