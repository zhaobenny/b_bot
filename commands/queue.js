const ytdl = require('ytdl-core');

module.exports = {
	name: 'queue',
	description: 'Queue of songs',
	async run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue.length != 0){
            msg.channel.send("🇶UEUE");
            for (let i = 0; i < client.servers[msg.guild.id].queue.length; i++) {
                let info = await ytdl.getBasicInfo(client.servers[msg.guild.id].queue[i]);
                msg.channel.send(i+1 + ". " + info.title);
            }
        } else {
            return msg.channel.send("there is no queue");
        }
    },
};