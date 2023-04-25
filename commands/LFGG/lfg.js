const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

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
		    // The label is the prompt the user sees for this input
			.setLabel("What game or role (e.g. @apex)?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const playerInput = new TextInputBuilder()
			.setCustomId('playerCount')
			.setLabel("Number of players?")
			.setRequired(false)
			.setStyle(TextInputStyle.Short);

		const firstActionRow = new ActionRowBuilder().addComponents(gameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(playerInput);
		modal.addComponents(firstActionRow, secondActionRow);
		await interaction.showModal(modal);		
	},
};
