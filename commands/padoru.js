module.exports = {
  name: 'padoru',
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
