const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "Help command",

    async run (bot, message, args) {

         

        let embed_huser = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Illusion Development', message.author.displayAvatarURL())
        .setImage("")
        .setThumbnail("https://cdn.discordapp.com/attachments/855937120003031099/866680270812217384/Roblox_Player_icon.png")
        .addField(`**🎶Music🎶 - (8)**`, [ 
            `**play**  | Plays a certain song.`,
            `**stop**  | Stops a song.`,
            `**skip**  | Skips a song.`,
            `**seek**  | Skips to a certain point in a song.`,
            `**volume**  | Changes the volume of a song.`,
            `**queue**  | Shows the queue for songs.`,
            `**loop**  | Repeats a song until stopped.`,
            `**autoplay**  | Enable and disable autoplay.`,
            '\u200b'
        ])
        .addField(`**🎶Filters🎶 - (7)**`, [ 
            `**3d**  | Applys a 3d effect to the song.`,
            `**bassboost**  | Applys a bassboost effect to the song.`,
            `**echo**  | Applys an echo effect to the song.`,
            `**karaoke**  | Applys a karaoke effect to the song.`,
            `**nightcore**  | Applys a nightcore effect to the song.`,
            `**vaporwave**  | Applys a vaporwave effect to the song.`,
            `**flanger**  | Applys a flanger effect to the song.`,
            '\u200b'
        ])
        .setTimestamp()
        .setFooter(`${message.author.tag}`)
    message.channel.send(embed_huser);
}}

