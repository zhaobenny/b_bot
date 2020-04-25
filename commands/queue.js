const ytdl = require('ytdl-core')

module.exports = {
  name: 'queue',
  description: 'Returns queue of songs',
  aliases: ['q'],

  async run (client, msg, args) {
    const server = client.servers[msg.guild.id]
    if (server && server.queue && server.queue.length !== 0) {
      msg.react('👍')
      let returnQueue = '``` Queue\n'
      for (let i = 0; i < server.queue.length && i < 10; i++) {
        const info = await ytdl.getBasicInfo(server.queue[i]) /// TO DO: remove await ytdl call -- make queue command faster
        if (typeof info.title !== 'undefined') {
          returnQueue += i + 1 + '. ' + info.title + '\n'
        }
      }
      returnQueue = returnQueue + '```'
      msg.channel.send(returnQueue)
    } else {
      return msg.channel.send('there is no queue')
    }
  },
}