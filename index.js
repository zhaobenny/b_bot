const Discord = require('discord.js')
const client = new Discord.Client()
const { LavaClient } = require("@anonymousg/lavajs");
var config
try {
   config = require('./config.json')
} catch (e){
  console.log('[BOT] Error in opening config.json! Is it a config json created?')
  return console.log(e)
}
const Enmap = require('enmap')
const fs = require('fs')
client.config = config
client.servers = {}

client.on('error', (e) => console.error(e))
client.on('warn', (e) => console.warn(e))

if (config.debug) {
  console.log('[BOT] Debug mode enabled')
  client.on('debug', (e) => console.info(e))
}

process.on('unhandledRejection', (error, reason) => {
  const now = new Date(Date.now())
  console.log('[BOT] Uncaught Promise Rejection at ' + now.toLocaleString('en-US') + '\n' + reason)
  console.dir(error.stack)
})

client.on('ready', () => {
  const nodes = [
    {
      host: "localhost",
      port: 2333,
      password: config.javalink_password,
    },
  ];
  client.music = new LavaClient(client, nodes);

  client.music.on('nodeSuccess', () => {
    console.log('[BOT] Connected to Lavalink node')
  });

  client.music.on('nodeError', (error) => {
    console.log('[BOT] Lavalink node error: \n' + error)
  });

	client.music.on('trackPlay', (track, player) => {
    client.channels.fetch(config.music_channel)
    .then(channel => channel.messages.fetch({ limit: 1 })
      .then(message => {
        if (message.first().author.bot && message.first().embeds[0] && message.first().embeds[0].author.name == 'Now Playing') {
          message.first().delete()
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor('Now Playing')
        .setTitle(track.title)
        .setURL(track.url)
        .setColor(0x00AE86)
        return message.first().channel.send({ embed })
      }).catch(console.error)
    )
    .catch(console.error)
	});


  const now = new Date(Date.now())
  console.log(`[BOT] Online as ${client.user.tag}! at ` + now.toLocaleString('en-US'))
  if (!config.debug) {
    client.user.setActivity('russian roulette')
  } else {
    client.user.setActivity('with code')
  }
})

fs.readdir('./events/', (err, files) => {
  if (err) {
    return console.error(err)
  }
  files.forEach(file => {
    const event = require(`./events/${file}`)
    let eventName = file.split('.')[0]
    client.on(eventName, event.bind(null, client))
  })
})

client.commands = new Enmap()

fs.readdir('./commands/', (err, files) => {
  if (err) {
    return console.error(err)
  }
  files.forEach(file => {
    if (!file.endsWith('.js')) {
      return
    }
    let commandFile = require(`./commands/${file}`)
    let commandName = file.split('.')[0]
    if (client.config.debug) {
      console.log('[BOT] Loading ' + commandName + '.js')
    }
    client.commands.set(commandName, commandFile)
  })
})

client.on('shardReconnecting', id => {
  const now = new Date(Date.now())
  console.log(`[BOT] Reconnecting to shard ${id} at ` + now.toLocaleString('en-US'))
})

client.on('disconnect', () => {
  const now = new Date(Date.now())
  console.log('[BOT] Disconnected at ' + now.toLocaleString('en-US'))
})

client.login(config.token)
