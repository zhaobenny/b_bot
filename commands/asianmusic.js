const play = require("./play.js");
const shuffle = require("./shuffle.js");

module.exports = {
	name: 'asianmusic',
    description: 'Plays hard set Asian music playlist',
    aliases: ['usual','aznmusic'],
	run(client, msg, args) {
        let server = client.servers[msg.guild.id]
        if (server && server.queue && server.queue.length != 0){
            return msg.channel.send('There is already a queue');
        }
        play.run(client, msg, ["https://www.youtube.com/playlist?list=PLjGLpHMZeGzKnUIS7druCuSbgCJumFpQp"]);
        play.run(client, msg, ["https://www.youtube.com/playlist?list=PL1R1F6p67q33siReKhbAlbdhZZhjTch8F"]);
        setTimeout(function(){
            shuffle.run(client, msg, ["all"]);
        }, 5000);
	},
};