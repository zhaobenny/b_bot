module.exports = {
	name: 'clear',
    description: 'Clear queue of songs',
    aliases: ['c', 'empty'],
	run(client, msg, args) {
        let server = client.servers[msg.guild.id];
        if (server && server.queue && server.queue.length != 0){
            server.queue =  [server.queue.shift()];
            return msg.react('👍');
        } else {
            msg.channel.send("there is no queue");
        }
	},
};