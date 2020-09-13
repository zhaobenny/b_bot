module.exports = {
  name: 'help',
  description: 'HELP',
  cooldown: 5,
  aliases: ['what, h'],
  run (client, msg, args) {
    // Code based off https://discordjs.guide/command-handling/adding-features.html#a-dynamic-help-command
    const data = []
    if (!args.length) {
      data.push('Here\'s a list of all my commands:')
      data.push(client.commands.map(command => command.name).join(', '))
      data.push(`\nSend \`${client.config.prefix}help [command name]\` to get info on a specific command!`)
      return msg.channel.send(data, { split: true })
    }

    const name = args[0].toLowerCase()
    const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name))

    if (!command) {
      return msg.channel.sent('lol that\'s not a valid command!')
    }
    data.push(`**Name:** ${command.name}`)
    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description) data.push(`**Description:** ${command.description}`)
    if (command.usage) data.push(`**Usage:** ${client.config.prefix}${command.name} ${command.usage}`)
    data.push('```')
    msg.channel.send(data, { split: true })
  }
}
