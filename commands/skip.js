module.exports = {
	name: 'Skip',
    description: 'Skip song',
    aliases: ['next'],
	run(client, msg, args) {
        if (!msg.member.voice.channel){
            return msg.channel.send("You're not in a voice channel!");
        }
        if (!msg.guild.voice.connection){
            return msg.channel.send("I am not in one?");
        }
        if (!client.servers[msg.guild.id] || !client.servers[msg.guild.id].queue || client.servers[msg.guild.id].queue.length === 0){
            return msg.channel.send("There is no queue");
        }
        client.servers[msg.guild.id].dispatcher.end();
        return msg.react('👍');

    }
};