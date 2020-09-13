module.exports = {
    name: 'unmuteself',
    description: 'Unmutes self in the Discord server',
    aliases: ['ums'],
    cooldown: 5,
    async run (client, msg, args) {
      msg.member.voice.setMute(false, "Self-unmute command");
      return msg.react('👍');
    }
  }
