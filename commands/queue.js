const ytdl = require('ytdl-core');

module.exports = {
	name: 'queue',
	description: 'Queue of songs',
	async run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue.length != 0){
            msg.react('👍');
            var returnQueue = "``` Queue\n";
            for (let i = 0; i < client.servers[msg.guild.id].queue.length && i < 10; i++) {
                let info = await ytdl.getBasicInfo(client.servers[msg.guild.id].queue[i]); ///TO DO: remove await ytdl call -- make queue command faster
                if (typeof info.title != "undefined"){
                    returnQueue += i+1 + ". " + info.title + "\n";
                }
            }
            returnQueue = returnQueue + "```";
            msg.channel.send(returnQueue);
        } else {
            return msg.channel.send("there is no queue");
        }
    },
};