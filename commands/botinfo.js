const { MessageEmbed } = require('discord.js');
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    help: {
        name: 'uptime',
        aliases: ['uptime'],
        description: 'Shows the Bot\'s uptime',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        let uptime = moment.duration(client.uptime).format("D [ days] h[ hours] m[ minutes] s[ seconds]")

        const duration = moment.duration(client.uptime)
        let bicon = client.user.displayAvatarURL()
        const embed = new MessageEmbed()
            .setTitle("Bot Info")
            .setColor("3498db")
            .setDescription(`:white_check_mark: **Online For:** \`${uptime}\` \n :white_check_mark:  **Bot latency:** \`${client.ws.ping} ms\` \n\n`)
            .addField(`**🤖Stats🤖**`, [ 
                `**Total Servers**  | ${client.guilds.cache.size}`,
                `**Server Members**  | ${client.users.cache.size}`,
                `**Owner**  | ${message.guild.owner.user.tag}`,
                `**Location**  | ${message.guild.region}`,
                `**Bot Invite**  | https://discord.com/oauth2/authorize?client_id=866047935628574730&permissions=8&scope=bot`,
                '\u200b'
            ])
            .setTimestamp()
            .setFooter(`${message.author.tag}`)
            .setThumbnail(bicon);
        message.channel.send(embed);
    }
}