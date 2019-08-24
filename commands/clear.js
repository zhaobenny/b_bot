module.exports = {
	name: 'Clear',
	description: 'Clear queue of songs',
	run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue.length != 0){
            client.servers[msg.guild.id].queue = client.servers[msg.guild.id].queue[0];
            return msg.react('👍');
        } else {
            msg.channel.send("there is no queue");
        }
	},
};