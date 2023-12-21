const { SlashCommandBuilder } = require("discord.js")
const { PermissionFlagsBits, EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("voting")
		.setDescription("Start a server vote")
		.addStringOption((option) =>
			option
				.setName("topic")
				.setDescription("Topic")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("The message to send")
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("The channel to send to")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("emoji1")
				.setDescription("Reaction emoji 1")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("emoji2")
				.setDescription("Reaction emoji 2")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("emoji3")
				.setDescription("Reaction emoji 3")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("emoji4")
				.setDescription("Reaction emoji 4")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("emoji5")
				.setDescription("Reaction emoji 5")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("emoji6")
				.setDescription("Reaction emoji 6")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("image_link")
				.setDescription("Image for announcement")
				.setRequired(false)
		)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction, client) {
			const topic = interaction.options.getString("topic")
			const whatever = interaction.options.getString("message")
			const destination =
				interaction.options.getChannel("channel") || interaction.channel
			const image = interaction.options.getString("image_link")
			const emoji1 = interaction.options.getString("emoji1") || "👍"
			const emoji2 = interaction.options.getString("emoji2") || "👎"
			const emoji3 = interaction.options.getString("emoji3")
			const emoji4 = interaction.options.getString("emoji4")
			const emoji5 = interaction.options.getString("emoji5")
			const emoji6 = interaction.options.getString("emoji6")

			let votingEmbed = new EmbedBuilder()
				.setTitle(`🗳️**IT's YOUR TURN VOTE NOW**🗳️`)
				.setAuthor({ name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
				.addFields(
					{ name: `${topic}\n`, value: `${whatever}\n`, inline: true },
				)
				.setThumbnail('https://media.tenor.com/oKET9UvyqwUAAAAi/1person-1vote.gif')
				.setImage(image)
				.setColor('LuminousVividPink')
				.setFooter({ text: `Started by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
				.setTimestamp();
			let voembed = new EmbedBuilder()
				.setTitle("Done!")
				.setDescription(`📢 Voting have been started in ${destination}`)
				.setColor(0xFF0000);

			await interaction.reply({ embeds: [voembed], ephemeral: true }).catch((err) => { })
			destination.send({ embeds: [votingEmbed] })
				.catch((err) => { })
				.then(async (votingEmbed) => {
					await votingEmbed.react(emoji1).catch((err) => { })
					await votingEmbed.react(emoji2).catch((err) => { })
					if (emoji3) {
						await votingEmbed.react(emoji3).catch((err) => { })
					}
					if (emoji4) {
						await votingEmbed.react(emoji4).catch((err) => { })
					}
					if (emoji4) {
						await votingEmbed.react(emoji4).catch((err) => { })
					}
					if (emoji5) {
						await votingEmbed.react(emoji5).catch((err) => { })
					}
					if (emoji6) {
						await votingEmbed.react(emoji6).catch((err) => { })
					}
				});
			setTimeout(() => {
				interaction.deleteReply();
			}, 5000);
	},
};
