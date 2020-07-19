module.exports = {
  name: 'queue',
  description: 'Returns queue of songs',
  aliases: ['q'],

  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (player && !player.queue.empty) {
      var queue = player.queue.toArray()
      msg.react('👍')
      var returnQueueText = '```Queue\n'
      for (let i = 0; i < (player.queue.size) && i < 10; i++) {
        var song = queue[i]
        returnQueueText += (i + 1) + '. ' + song.title + '\n'
      }
      returnQueueText += 'The queue is ' + (player.queue.size) + ' songs. Also yell at Benny to make an better queue command.'
      returnQueueText = returnQueueText + '```'
      msg.channel.send(returnQueueText)
    } else {
      return msg.channel.send('there is no queue')
    }
  }
}
