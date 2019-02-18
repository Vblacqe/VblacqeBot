const commando = require('discord.js-commando');

class JoinChannelCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'join',
            group: 'connectc',
            memberName: 'join',
            description: 'Joins to the channel'
        });
    }

    async run(message, args){
        if(message.member.voiceChannel){
            if(!message.guild.voiceConnection){
                if(!message.member.isAdmin){
                    return;
                }
                message.member.voiceChannel.join()
                .then(connection =>{
                    message.reply('Successfully joined!');
                })
            }
        }
        else{
            message.reply('You must be in voice channel');
        }
    }
}

module.exports = JoinChannelCommand;
