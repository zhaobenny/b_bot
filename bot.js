const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const Enmap = require("enmap");
const fs = require("fs");
client.config = config;

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on('ready', () => {
    console.log(`Online as ${client.user.tag}!`);
    client.user.setActivity('russian roulette');
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


client.once('reconnecting', () => {
    console.log('Reconnecting');
   });

client.once('disconnect', () => {
    console.log('Disconnected');
});


client.login(config.token);