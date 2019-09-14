module.exports = {
	name: 'DC',
    description: 'Bot will DC from voice channel',
    aliases: ['leave', 'disconnect','reset','stop'],
	run(client, msg, args) {
        if (!msg.guild.voice){
            return msg.channel.send("I am not in one?");
        }
        if (msg.guild.voice.connection){
            let server = client.servers[msg.guild.id];
            server.queue = [];
            server.dispatcher = null;
            msg.guild.voice.connection.disconnect();
            return msg.react('👍');
        } else {
            return msg.channel.send("I am not in one?");
        }
	},
};