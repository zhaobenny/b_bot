const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'returns helpful infomation',
  aliases: ['what'],
  run (client, msg, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Click here for a list of bot commands!')
      .setAuthor('Help', 'https://cdn.discordapp.com/avatars/613858461628891252/694dc5a4dc73545fb7d4ed6c312d50ef.png?size=2048')
      .setColor(0x00AE86)
      .setURL('https://github.com/zhaobenny/b_bot/wiki/Commands')
    msg.channel.send({ embed })
  }
}
