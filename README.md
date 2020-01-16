# b_bot
Basic music-playing Discord bot made for own personal uses.
###  Installation
Inital setup instructions assumes Ubtuntu 18.04 as OS
```
git clone https://github.com/zhaobenny/b_bot.git
cd b_bot
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install nodejs
npm install
```
Copy the exampleconfig.json and rename it to config.json. Paste in your Discord bot token and Youtube API key into the correct variables of config.json.
### Usage
Run the bot using
```
npm start
```