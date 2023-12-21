const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('schedule')
        .setDescription('Schedule a message to be sent at a specific date and time.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand.setName('text')
                .setDescription('Schedule message as a simple text.')
                .addStringOption(option =>
                    option.setName('message')
                        .setDescription('The message to be sent as a simple text.')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('date')
                        .setDescription('The date the message should be sent (DD-MM-YYYY) eg-[09-08-2022].')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('time')
                        .setDescription('The time the message should be sent in 24hr format (HH:MM) eg-[21:05].')
                        .setRequired(true)),
        )
        .addSubcommand(subcommand =>
            subcommand.setName('embed')
                .setDescription('Schedule as an embed message.')
                .addStringOption(option =>
                    option.setName('title')
                        .setDescription('The title of the embed.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('The description of the embed.')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('date')
                        .setDescription('The date the message should be sent (DD-MM-YYYY) eg-[09-08-2022].')
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('time')
                        .setDescription('The time the message should be sent in 24hr format (HH:MM) eg-[21:05].')
                        .setRequired(true))
                .addStringOption((option) =>
                    option.setName("thumbnail_link")
                        .setDescription("Thumbnail for announcement")
                        .setRequired(false)
                )
                .addStringOption((option) =>
                    option.setName("image_link")
                        .setDescription("Image for announcement")
                        .setRequired(false)),
        ),
    /**
* @param {ChatInputCommandInteraction} interaction 
* @param {Client} client 
*/
    async execute(interaction, client) {
        try {
            const subcommand = interaction.options.getSubcommand();

            if (subcommand == 'text') {
                // Check if user has permission to schedule messages
                const message = interaction.options.getString('message');
                const date = interaction.options.getString('date');
                const time = interaction.options.getString('time');

                // Combine date and time strings into a single date object
                const [day, month, year] = interaction.options.getString('date').split('-');
                const dateTime = new Date(`${year}-${month}-${day}T${time}:00`);

                // Check if scheduled time has already passed
                if (dateTime <= new Date()) {
                    return await interaction.reply({ content: 'Scheduled time has already passed.', ephemeral: true });
                }
                // Schedule message to be sent at specified time
                setTimeout(() => {
                    interaction.channel.send(message);
                }, dateTime - new Date());

                const textEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle('Message Scheduled Sucessfully')
                    .addFields([
                        { name: 'Scheduled Message', value: message, inline: false },
                        { name: 'Scheduled Time:', value: `${time}`, inline: true },
                        { name: 'Scheduled Date:', value: `${date}`, inline: true }
                    ])
                    .setTimestamp();

                await interaction.reply({ embeds: [textEmbed], ephemeral: true });
                //await interaction.reply(`Message scheduled to be sent on ${date} at ${time}.`);

            } else if (subcommand == 'embed') {
                const title = interaction.options.getString('title');
                const description = interaction.options.getString('description');
                const date = interaction.options.getString('date');
                const time = interaction.options.getString('time');
                const thumbnail = interaction.options.getString("thumbnail_link")
                const image = interaction.options.getString("image_link")

                // Combine date and time strings into a single date object
                const [day, month, year] = interaction.options.getString('date').split('-');
                const dateTime = new Date(`${year}-${month}-${day}T${time}:00`);

                // Check if scheduled time has already passed
                if (dateTime <= new Date()) {
                    return await interaction.reply({ content: 'Scheduled time has already passed.', ephemeral: true });
                }
                // Schedule message to be sent at specified time
                setTimeout(() => {
                    const Embed = new EmbedBuilder()
                        .setColor("Random")
                        .setTitle(title)
                        .setDescription(description)
                        .setThumbnail(thumbnail)
                        .setImage(image)
                        .setTimestamp();
                    interaction.channel.send({ embeds: [Embed] });
                }, dateTime - new Date());

                const msgEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle('Message Scheduled Sucessfully')
                    .addFields([
                        { name: 'Embed Title:', value: title, inline: false },
                        { name: 'Embed Description:', value: description, inline: false },
                        { name: 'Scheduled Time:', value: `${time}`, inline: true },
                        { name: 'Scheduled Date:', value: `${date}`, inline: true }
                    ])
                    .setThumbnail(thumbnail)
                    .setImage(image)
                    .setTimestamp();
                await interaction.reply({ embeds: [msgEmbed], ephemeral: true })
            }
        } catch (err) {
            const stack = err.stack.split('\n')[1].trim();
            const stackTrace = err.stack;
            const regex = /\((\S+)\)/;
            const match = regex.exec(stackTrace);
            const lineNumber = match ? match[1] : "unknown";
            const errEmbed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("⚠️ Error Occurred ⚠️")
                .addFields([
                    { name: '🖥️ **ERROR:**', value: `\`\`\`md\n${err}\`\`\``, inline: false },
                    { name: '🖥️ **ERR:**', value: `\`\`\`md\n${err.message}\`\`\``, inline: true },
                    { name: '🖥️ **Event no:**', value: `\`\`\`md\n${lineNumber}\`\`\``, inline: true },
                    { name: '👤 **Triggered By:**', value: `\`\`\`md\n${interaction.user.username} #${interaction.user.discriminator}\`\`\``, inline: true },
                    { name: '🖥️ **Path:**', value: `\`\`\`${stack}\`\`\``, inline: true },
                ])
                .setFooter({ text: `Command -- ${interaction.commandName}` })
                .setTimestamp();
            client.channels.cache.get(process.env.ERRORCHANNEL_ID).send({ embeds: [errEmbed] })
        }
    },
};