const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Enmap = require("enmap");
const fs = require("fs");
client.config = config;
client.servers = {};

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
if (config.debug){
  console.log(`[BOT] Debug mode enabled`);
  client.on("debug", (e) => console.info(e));
}
process.on('unhandledRejection', error => console.error('[Bot] Uncaught Promise Rejection', error));


client.on('ready', () => {
    console.log(`[BOT] Online as ${client.user.tag}!`);
    if (config.debug){
      client.user.setActivity('russian roulette');
    } else {
      client.user.setActivity('with code');
    }
});

fs.readdir("./events/", (err, files) => {
    if (err){
        return console.error(err);
    }
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err){
        return console.error(err);
    }
    files.forEach(file => {
      if (!file.endsWith(".js")){
        return;
      }
      let commandFile = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, commandFile);
    });
  });


client.once('shardReconnecting', id => {
    console.log(`[BOT] Reconnecting to shard ${id}`);
   });

client.once('disconnect', () => {
    console.log('[BOT] Disconnected');
});


client.login(config.token);