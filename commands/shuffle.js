

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
// function shuffle from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

module.exports = {
	name: 'Shuffle',
    description: 'Shuffles queue',
	run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue.length != 0){
            msg.react('👍');
            var server = client.servers[msg.guild.id];
            if (args[0] == "all"){
                shuffle(server.queue);
                client.commands.get("skip").run(client, msg, args);
            } else {

                var notFirstSong = shuffle(server.queue.slice(1));
                server.queue =  [client.servers[msg.guild.id].queue.shift()]
                server.queue = server.queue.concat(notFirstSong);
            }
        } else {
            return msg.channel.send("There is no queue");
        }

    }
};