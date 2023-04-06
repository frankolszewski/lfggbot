const { SlashCommandBuilder, ThreadAutoArchiveDuration } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lfg')
		.setDescription('Looking for group!')
		.addStringOption(option =>
			option.setName("game")
			.setDescription("Game")
			.setRequired(true))
		.addStringOption(option =>
			option.setName("players")
			.setDescription("Player count")
			.setRequired(false)),
	async execute(interaction) {
		const game = interaction.options.getString("game");
		const players = interaction.options.getString("players") ?? "Anyone!";
		await interaction.reply({ content: `${interaction.member} is looking for ${players} for ${game}!`, ephemeral: false });

		const thread = await interaction.channel.threads.create({
			name: `${interaction.user.username}'s ${game} game`,
			autoArchiveDuration: ThreadAutoArchiveDuration.OneHour, // This is for inactivity in the thread!
			reason: `${interaction.member}'s ${game} thread!`});
		
	},
};
