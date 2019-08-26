module.exports = {
	name: 'Clear',
    description: 'Clear queue of songs',
    aliases: ['c', 'empty'],
	run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue.length != 0){
            client.servers[msg.guild.id].queue =  [client.servers[msg.guild.id].queue.shift()];
            return msg.react('👍');
        } else {
            msg.channel.send("there is no queue");
        }
	},
};