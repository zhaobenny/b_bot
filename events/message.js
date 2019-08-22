module.exports = (client, msg) => {
    if (msg.content == "where benny"){
        msg.channel.send("idk");
    }
    if ((msg.content.indexOf(client.config.prefix) !== 0) || msg.author.bot){
        return;
    }
    const args = msg.content.substring(client.config.prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd){
        msg.channel.send('wtf like thats not a command');
        return;
    }
    cmd.run(client, msg, args);
};