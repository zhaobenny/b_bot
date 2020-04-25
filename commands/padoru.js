module.exports = {
  name: 'Padoru',
  description: 'Padoru!',
  run (client, msg, args) {
    msg.channel.send({
      files: [{
        attachment: 'resources/padoru.gif',
        name: 'padoru.gif'
      }]
    })
  }
}
