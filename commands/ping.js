module.exports = {
	name: 'ping',
	description: 'Ping!',
	run(client, msg, args) {
		msg.channel.send('Pong!');
	},
};