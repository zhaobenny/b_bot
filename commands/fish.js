module.exports = {
	name: 'Padoru',
	description: 'Padoru!',
	run(client, msg, args) {
		msg.channel.send({
            files: [{
              attachment: 'resources/sakurafish.gif',
              name: 'sakurafish.gif'
            }]
          });
	},
};