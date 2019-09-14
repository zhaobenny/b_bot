const youtubeapi = require('simple-youtube-api');

module.exports = {
	name: 'search',
	description: 'Searches for Youtube links',
	run(client, msg, args) {
        const youtube = new youtubeapi(client.config.yt_key);
        youtube.searchVideos(args.join(' '), 5).then(results => {
            let returnResults = "```markdown\n# Search Results\n"
            for (i = 0; i < results.length; i++){
                returnResults += i+1 + ". " + results[i].title + "\n" + "https://www.youtube.com/watch?v=" + results[i].id + "\n";
            }
            returnResults += "> Use " + client.config.prefix + "play [video link] to queue songs.```"
            msg.channel.send(returnResults);
        })
        .catch(console.error);
    },
};