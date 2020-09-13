module.exports = {
    name: 'unmuteself',
    description: 'Unmutes self in the Discord server',
    aliases: ['ums'],
    cooldown: 3600,
    async run (client, msg, args) {
      if (!msg.member.voice.channel) {
        return msg.channel.send("You're not in a voice channel!")
      }
      msg.member.voice.setMute(false, "Self-unmute command");
      return msg.react('👍');
    }
  }
