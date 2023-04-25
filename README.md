# lfggbot
Looking for Gaming Group bot

# Setup
1. `npm -v` >= v16.9.0
2. `npm install discord.js`

# Deploying
https://discord.com/developers/applications/1093268075752730764/oauth2/url-generator
Scopes: Bot
Bot permissions: Administrator
Copy generated URL, paste into a new tab

# Running
## Updating slash commands
Any commands that live in the `/commands/` folder MUST live in one folder deeper (e.g. `/commands/systemcalls/ping.js`)
Run: `node deploy-commands.js`

## Running the bot
Run: `node index.js`