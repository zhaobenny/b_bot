
function shuffle (array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
// function shuffle from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

module.exports = {
  name: 'shuffle',
  description: 'Shuffles queue',
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    // TO DO: fix this shuffle command
    if (player && !player.queue.empty) {
      msg.react('👍')
      if (args[0] === 'all') {
        shuffle(player.queue)
      } else {
        try {
          const notFirstSong = shuffle((player.queue.slice(1)))
          player.queue = [player.queue.shift()]
          player.queue = player.queue.concat(notFirstSong)
        } catch (error) {
          return msg.channel.send('Shuffle command is broken - yell at Benny or something')
        }
      }
    } else {
      return msg.channel.send('There is no queue')
    }
  }
}
