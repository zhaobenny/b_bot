module.exports = (client, msg) => {
  if (msg.guild.id === 282615940124901377 && msg.content === 'where benny') {
    return msg.channel.send('idk')
  }

  if ((msg.content.indexOf(client.config.prefix) !== 0) || msg.author.bot) {
    return
  }
  const args = msg.content.substring(client.config.prefix.length).split(/ +/g)
  const commandName = args.shift().toLowerCase()
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
  if (client.config.debug) {
    console.log('[BOT] Attempting to run command "' + commandName + '" with arguments: [' + args + ']')
  }
  if (!command) {
    return msg.channel.send('wtf like thats not a command')
  }
  // Cooldown code based off https://discordjs.guide/command-handling/adding-features.html#cooldowns
  const now = Date.now()
  const timestamps = client.cooldowns.get(command.name)
  if (!timestamps) {
    return
  }
  const cooldownAmount = (command.cooldown || 0) * 1000
  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000 / 60
      return msg.reply(`wait ${timeLeft.toFixed(0)} more minute(s) before using  the \`${command.name}\` command.`)
    }
  }
  timestamps.set(msg.author.id, now)
  command.run(client, msg, args)
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)
}
