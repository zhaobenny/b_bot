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
    const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
    // Simulate delays

    play.run(client, msg, ['https://www.youtube.com/playlist?list=PLjGLpHMZeGzKnUIS7druCuSbgCJumFpQp'])
    await snooze(2000);
    player = await client.music.playerCollection.get(msg.guild.id);
    player.pause()
    play.run(client, msg, ['https://www.youtube.com/playlist?list=PL1R1F6p67q33siReKhbAlbdhZZhjTch8F'])
    await snooze(4000);
    shuffle.run(client, msg, [''])
    await snooze(3000);
    skip.run(client, msg, [''])
    player.resume()
    return msg.react('👍')
  }
}
