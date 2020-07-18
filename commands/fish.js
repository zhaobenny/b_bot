module.exports = {
  name: 'Fish',
  description: 'Fish!',
  run (client, msg, args) {
    msg.channel.send({
      files: [{
        attachment: 'resources/sakurafish.gif',
        name: 'sakurafish.gif'
      }]
    })
  }
}
