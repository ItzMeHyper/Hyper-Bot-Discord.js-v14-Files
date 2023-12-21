const { Client, SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Gives the bot and api current ping')
        .setDMPermission(false),

    /**
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client 
 */
    async execute(interaction, client) {
            const ping = interaction.CreatedTimestamp - interaction.CreatedTimestamp
            const pingEmbed = new EmbedBuilder()
                .setColor(0x008000)
                .setTitle("🎯 Pong!")
                .addFields([
                    { name: 'Bot Latency 🌐', value: `⦿ ${Date.now() - interaction.createdTimestamp}ms` },
                    { name: 'API Latency 🖥️', value: `⦿ ${client.ws.ping}ms` },
                ])
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            interaction.reply({ content: "✅ - Well this is the current ping!", embeds: [pingEmbed] })

    },
};
