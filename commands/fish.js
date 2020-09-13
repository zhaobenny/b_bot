module.exports = {
  name: 'fish',
  description: 'fish!',
  run (client, msg, args) {
    msg.channel.send({
      files: [{
        attachment: 'resources/sakurafish.gif',
        name: 'sakurafish.gif'
      }]
    })
  }
}
