module.exports = {
	name: 'avatar',
    description: 'Returns avatar image',
    aliases: ['icon', 'pfp'],
	run(client, msg, args) {
        if (args.length != 0 && msg.mentions.users.size === 0){
            return msg.channel.send(`what are u doing thats not how u use it`);
        }
        if (msg.mentions.users.size === 0){
            return msg.channel.send(`Your avatar link: <${msg.author.displayAvatarURL()}>`);
        } else if (msg.mentions.users.size >= 1) {
           msg.mentions.users.map(user => {
                return msg.channel.send(`${user.username}'s avatar link: <${user.displayAvatarURL()}>`)
           });
        }
	},
};