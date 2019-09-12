module.exports = (client, msg) => {
    if (msg.content == "where benny"){
        msg.channel.send("idk");
    }

    if ((msg.content.indexOf(client.config.prefix) !== 0) || msg.author.bot){
        return;
    }
    const args = msg.content.substring(client.config.prefix.length).split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const  command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));;

    if (!command){
        return msg.channel.send('wtf like thats not a command');
    }
    command.run(client, msg, args);
};