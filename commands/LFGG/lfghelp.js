const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, SelectMenuBuilder, ComponentBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lfghelp')
		.setDescription('Looking for group help!'),
	async execute(interaction) {
		const headerMessage = '** Looking For Gaming Group Bot Help **\n\n' +
		'When calling `/lfg`, you will be presented with three options.  Each of these ' +
		'has a matching symbol which links the help section to the `/lfg` box.';

		const gameMessage = '🕹️ If you have a specific role you would like to ping, such as `@apex` or `@minecraft`, ' +
		'please use that as the game name.';

		const numberOfPlayersMessage = '👥 The number of players is optional.  This has no effect on the group.';

		const hammertimeMessage = '⏲️ This field takes a timestamp indicator from [HammerTime](https://hammertime.cyou/)';

		await interaction.reply({
			content: headerMessage,
			ephemeral: true
		});

		await interaction.followUp({
			content: gameMessage,
			ephemeral: true
		});
		await interaction.followUp({
			content: numberOfPlayersMessage,
			ephemeral: true
		});
		await interaction.followUp({
			content: hammertimeMessage,
			ephemeral: true
		});
	},
};
