const play = require("./play.js");
const shuffle = require("./shuffle.js");
const skip = require("./skip.js");


module.exports = {
	name: 'asianmusic',
    description: 'Plays hard set Asian music playlist',
    aliases: ['usual','aznmusic'],
    async addPlaylists(client, msg, callback){
        await play.run(client, msg, ["https://www.youtube.com/playlist?list=PLjGLpHMZeGzKnUIS7druCuSbgCJumFpQp"]);
        await play.run(client, msg, ["https://www.youtube.com/playlist?list=PL1R1F6p67q33siReKhbAlbdhZZhjTch8F"]);
        callback();
    },
	run(client, msg, args) {
        let server = client.servers[msg.guild.id]
        if (server && server.queue && server.queue.length != 0){
            return msg.channel.send('There is already a queue');
        }
        this.addPlaylists(client, msg, function(){
            setTimeout(shuffle.run, 2000, client, msg, ["all"]);
            setTimeout(skip.run, 5500, client, msg, [""]);
        });
	},
};