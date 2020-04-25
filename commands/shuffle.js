
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
  run (client, msg, args) {
    const server = client.servers[msg.guild.id]
    if (server && server.queue && server.queue.length !== 0) {
      msg.react('👍')
      if (args[0] === 'all') {
        shuffle(server.queue)
      } else {
        const notFirstSong = shuffle(server.queue.slice(1))
        server.queue = [server.queue.shift()]
        server.queue = server.queue.concat(notFirstSong)
      }
    } else {
      return msg.channel.send('There is no queue')
    }
  }
}
