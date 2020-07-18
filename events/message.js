module.exports = (client, msg) => {
    if (msg.guild.id == 282615940124901377 && msg.content == "where benny"){
        return msg.channel.send("idk")
    }

    if ((msg.content.indexOf(client.config.prefix) !== 0) || msg.author.bot){
        return
    }
    const args = msg.content.substring(client.config.prefix.length).split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const  command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    if (client.config.debug){
        console.log("[BOT] Attempting to run command \"" + commandName + "\" with arguments: [" + args + "]")
    }
    if (!command){
        return msg.channel.send('wtf like thats not a command')
    }
    command.run(client, msg, args);
};