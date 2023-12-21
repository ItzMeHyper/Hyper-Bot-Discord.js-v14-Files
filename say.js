const { SlashCommandBuilder } = require("@discordjs/builders")
const { PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Make me say whatever you want anywhere >;)")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message I say")
                .setRequired(true)
        )
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("The channel to say in")
                .setRequired(false)
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {

        const whatever = interaction.options.getString("message")
        const destination =
            interaction.options.getChannel("channel") || interaction.channel

        await interaction.reply({ content: "message has be sent", ephemeral: true}).catch((err) => { })

        destination.send(whatever).catch((err) => {
            console.log(err)
        })
    },
};