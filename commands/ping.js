module.exports = {
  name: 'ping',
  description: 'Pong.',
  run (client, msg, args) {
    msg.channel.send('Pong!')
  }
}
