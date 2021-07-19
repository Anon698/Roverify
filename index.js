var config = require('./config.json');
var Discord = require('discord.js');
const DisTube = require('distube'),
{ commands } = require('npm');
var client = new Discord.Client();

console.log('Illusion');
console.log('A multipurpose bot for Discord.\n');
console.log('Copyright © Illusion Development 2021.');
console.log('----------------------------------------------');




var profanities = ["nigger", "negro", "skid", "crack", "coon", "faggot", "kys", "fag"];

client.on('message', async message => {
    let msg = message.content.toLowerCase();
    for (x = 0; x < profanities.length; x++) {
        if (msg.includes(profanities[x])){   
            message.delete()
            message.channel.send(`<@${message.author.id}> has said a blacklisted word, moderate accordingly.`)
            
            return;     
        }
    }
});




const distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true, highWaterMark: 1<<25})

const filters = ["3d","bassboost","echo","karaoke","nightcore","vaporwave","flanger"];


distube.on("initQueue", queue => {
    queue.autoplay = false;
    queue.volume = 100;
});

client.on('message', (message) => {
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (command == "autoplay") {
        let mode = distube.toggleAutoplay(message);
        message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
});

client.on('ready', () => {
    const arrayofStatus = [
        `${client.guilds.cache.size} Servers!`,
        `Prefix is: .`,
        `${client.users.cache.size} Members!`,
        `Verifying users!`,
        `Made By Illusion Development`
    ];

    let index = 0;
    setInterval(() => {
       if(index === arrayofStatus.length) index = 0;
       const status = arrayofStatus[index];
       console.log
       client.user.setActivity(status)
       index++;
    }, 5000) //in ms
})





client.on("message", message => {
    if(message.author.bot){ return; }
    if(!message.guild) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();


    if(command === "play" || command === "p"){
        embedbuilder(client, message, "YELLOW", "Searching!", args.join(" "))
        return distube.play(message, args.join(" "));
    }
    if(command === "skip" || command === "s"){
        embedbuilder(client, message, "YELLOW", "SKIPPED!", `Skipped the song`)
        return distube.skip(message);
    } 
    if(command === "stop" || command === "leave"){
        embedbuilder(client, message, "RED", "STOPPED!", `Leaved the channel`)
        return distube.stop(message);
    }
    if(command === "seek"){
        embedbuilder(client, message, "GREEN", "Seeked!", `seeked the song for \`${args[0]} seconds\``)
        return distube.seek(message, Number(args[0]*1000));
    } 
    if(filters.includes(command)) {
        let filter = distube.setFilter(message, command);
        return embedbuilder(client, message, "YELLOW", "Adding filter!", filter)
    }
    if(command === "volume" || command === "vol"){
        
        embedbuilder(client, message, "GREEN", "VOLUME!", `changed volume to \`${args[0]} %\``)
        return distube.setVolume(message, args[0]);
    } 
    if (command === "queue" || command === "qu"){
        let queue = distube.getQueue(message);
        let curqueue = queue.songs.map((song, id) =>
        `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).join("\n");
        return  embedbuilder(client, message, "GREEN", "Current Queue!", curqueue)
    }
    if (command === "loop" || command === "repeat"){
        if(0 <= Number(args[0]) && Number(args[0]) <= 2){
            distube.setRepeatMode(message,parseInt(args[0]))
            embedbuilder(client, message, "GREEN", "Repeat mode set to:!", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
        }
        else{
            embedbuilder(client, message, "RED", "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }
    }

})



//queue
const status = (queue) => `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "OFF"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
//distube
distube
     .on("playSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Playing new Song!", `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n${status(queue)}`)
     })
     .on("addSong", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Added a Song!", `Song: \`${song.name}\`  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}`)
     })
     .on("playList", (message, queue, playlist, song) => {
        embedbuilder(client, message, "GREEN", "Playling playlist", `Playlist: \`${playlist.title}\`  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}\n\nstarting playing Song: \`${song.name}\`  -  \`${song.formattedDuration}\`\n${status(queue)}`)
     })
     .on("addList", (message, queue, song) => {
        embedbuilder(client, message, "GREEN", "Added a Playling!", `Playlist: \`${playlist.title}\`  -  \`${playlist.total_items} songs\` \n\nRequested by: ${song.user}`)
     })
     .on("searchResult", (message, result) => {
        let i = 0;
        embedbuilder(client, message, "YELLOW", "", `**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
     // DisTubeOptions.searchSongs = true
     .on("searchCancel", (message) =>  embedbuilder(client, message, "RED", `Searching canceled`, "")
     )
     .on("error", (message, err) => embedbuilder(client, message, "RED", "An error encountered:", err)
     )
     

//function embeds
//embedbuilder(client, message, "RED", "TITEL", "DESCRIPTION")
function embedbuilder(client, message, color, title, description){
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setFooter(client.user.username, client.user.displayAvatarURL());
    if(title) embed.setTitle(title);
    if(description) embed.setDescription(description);
    return message.channel.send(embed);
}



client.on('ready', async() => {
    console.log('Ready to use, developed by Illusion Development.');
    console.log('✔Commands✔');
})

client.on('message', async(msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;

    var prefix = config.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ');
    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
    } catch(err) {
        console.warn(err);
    }
});


client.login(config.token);