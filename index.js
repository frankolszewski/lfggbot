// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { ActivityType, Client, Collection, Events, GatewayIntentBits, ThreadAutoArchiveDuration } = require('discord.js');
const { token } = require('./config.json');
const cron = require('node-cron');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            console.log(`[INFO] Loaded ${filePath}`);
    		client.commands.set(command.data.name, command);
	    } else {
	    	console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	    }
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`[${new Date().toString()}] Ready! Logged in as ${c.user.tag}`);
	c.user.setPresence({ activities: [{ type: ActivityType.Watching, name: 'for /lfg !' }], status: 'idle' });
});

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.customId === 'lfgModal' && interaction.isModalSubmit()) {
		// https://discordjs.guide/interactions/modals.html#responding-to-modal-submissions
		let game = interaction.fields.getTextInputValue("game");
		let players = interaction.fields.getTextInputValue("playerCount");
		if (!players) {
			players = "anyone!";
		}
		const thread = await interaction.channel.threads.create({
			name: `${interaction.user.username}'s ${game} game - looking for ${players}`,
			autoArchiveDuration: ThreadAutoArchiveDuration.OneHour, // This is for inactivity in the thread!
			reason: `${interaction.member}'s ${game} thread!`});
		await thread.join();


		if (game.startsWith("@")) {
			let roleTag = game.replace("@", "");

			console.debug(`Looking for role: ${roleTag}`);
			console.debug(`Roles: ${interaction.guild.roles.cache.size}`);

			game = interaction.guild.roles.cache.find((role) => role.name === roleTag);
		}

		await thread.send(`${interaction.member} is looking for ${players} for ${game}`)
			.then(console.log)
			.catch(console.error);
		
		await interaction.reply({content: "Happy gaming :)", ephemeral: true});
		return;
	}
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		console.log(interaction);
	
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);

const cronSeconds="*/30";
const cronMinutes="*";
const cronHours="*";
const cronDayOfMonth="*";
const cronMonth="*";
const cronDayOfWeek="*";
cron.schedule(`${cronSeconds} ${cronMinutes} ${cronHours} ${cronDayOfMonth} ${cronMonth} ${cronDayOfWeek}`, async function() {
	console.log(`[${new Date().toLocaleTimeString()}] Reaper started`);

    const channel = client.channels.cache.get('1100438426869833809'); // TODO: hardcoded to #general, obviously not good.

	console.log(`[${new Date().toLocaleTimeString()}] Reaper reading channel: #${channel.name}`);

	channel.threads.cache.filter(async thread => {
		console.log(`Reading ${thread}`);
		if (thread.name.includes("game - ")
			// TODO: Better define the checking criteria
		) {
			console.log(`[${new Date().toLocaleTimeString()}] Reaper deleting thread: ${thread.name}`);
			try {
				await thread.delete();
			} catch (error) {
				console.error(error);
			}
		}
	});
	
	console.log(`[${new Date().toLocaleTimeString()}] Reaper done`);
});
