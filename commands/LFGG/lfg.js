const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SelectMenuBuilder, ComponentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lfg')
		.setDescription('Looking for group!'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId("lfgModal")
			.setTitle("Looking For Gaming Group!");

		const gameInput = new TextInputBuilder()
			.setCustomId('game')
			.setLabel("What game or role (e.g. @apex)?")
			.setMaxLength(100)
			.setMinLength(1)
			.setStyle(TextInputStyle.Short);

		const playerInput = new TextInputBuilder()
			.setCustomId('playerCount')
			.setLabel("Number of players?")
			.setRequired(false)
			.setMinLength(1)
			.setMaxLength(100)
			.setStyle(TextInputStyle.Short);

		const hammertimeInput = new TextInputBuilder()
			.setCustomId("hammertime")
			.setLabel("Play time (see: https://hammertime.cyou)")
			.setRequired(false)
			.setMinLength(1)
			.setMaxLength(50)
			.setStyle(TextInputStyle.Short);

		const firstActionRow = new ActionRowBuilder().addComponents(gameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(playerInput);
		const thirdActionRow = new ActionRowBuilder().addComponents(hammertimeInput);
		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
		await interaction.showModal(modal);		
	},
};
