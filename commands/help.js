const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "Help command",

    async run (bot, message, args) {

         

        let embed_huser = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Roverify - Made by Illusion Development!', message.author.displayAvatarURL())
        .setImage("")
        .setThumbnail("https://cdn.discordapp.com/attachments/855937120003031099/866680270812217384/Roblox_Player_icon.png")
        .addField(`**🎉Commands🎉 - (3)**`, [ 
            `**help**  | Displays the help embed.`,
            `**music**  | Displays the music embed.`,
            `**roblox**  | Displays the roblox embed.`,
            '\u200b'
        ])
        .setTimestamp()
        .setFooter(`${message.author.tag}`)
    message.channel.send(embed_huser);
}}

