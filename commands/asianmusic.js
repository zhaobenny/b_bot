const play = require('./play.js')
const shuffle = require('./shuffle.js')
const skip = require('./skip.js')

module.exports = {
  name: 'asianmusic',
  description: 'Play a hardcoded Kpop + Jpop music playlist from Youtube',
  aliases: ['usual', 'aznmusic'],
  async run (client, msg, args) {
    var player = await client.music.playerCollection.get(msg.guild.id);
    if (player && !player.queue.empty) {
      return msg.channel.send('There is already a queue')
    }
    play.run(client, msg, ['https://www.youtube.com/playlist?list=PLjGLpHMZeGzKnUIS7druCuSbgCJumFpQp'])
    play.run(client, msg, ['https://www.youtube.com/playlist?list=PL1R1F6p67q33siReKhbAlbdhZZhjTch8F'])
    // TO DO: fix these cmd
    shuffle.run(client, msg, ['all'])
    // skip.run(client, msg, [''])
    return msg.channel.send("Command doesn't shuffle songs after adding - tell Benny to fix it lol")
  }
}
