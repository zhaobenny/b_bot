module.exports = {
	name: 'resume',
	description: 'Resumes bot if playing',
	run(client, msg, args) {
        let server = client.servers[msg.guild.id];
        if (!msg.guild.voice){
            return msg.channel.send("I am not in one?");
        }
        if (server && server.queue && server.queue.length == 0){
            return msg.channel.send("There is no queue");
        }

        if (!server.dispatcher.paused){
            return msg.channel.send("Not paused");
        }

        server.dispatcher.resume();
        return msg.react('👍');
	},
};