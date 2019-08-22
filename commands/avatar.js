module.exports = {
	name: 'avatar',
	description: 'Returns avatar image',
	run(client, msg, args) {
        if (args.length != 0 && msg.mentions.users.size === 0){
            msg.channel.send(`what are u doing thats not how u use it`);
            return;
        }
        if (msg.mentions.users.size === 0){
            msg.channel.send(`Your avatar link: <${msg.author.displayAvatarURL}>`);
            return;
        } else if (msg.mentions.users.size >= 1) {
           msg.mentions.users.map(user => {
                msg.channel.send(`${user.username}'s avatar link: <${user.displayAvatarURL}>`)
                return;
           });
        }
	},
};