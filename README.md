# b_bot
[![Depfu](https://badges.depfu.com/badges/e6db7ca22f4528ae72f1a805d985396a/overview.svg)](https://depfu.com/github/zhaobenny/b_bot?project_id=13550)

Discord bot capable of playing Youtube videos and Spotify links (through Youtube) made for own personal uses.

###  Installation
Inital setup instructions assumes Ubtuntu 16.04+ as OS
```
sudo apt install build-essential
git clone https://github.com/zhaobenny/b_bot.git
cd b_bot
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install nodejs
sudo apt-get install ffmpeg
npm install
```
Make a copy of the exampleconfig.json and rename it to config.json.
Paste in your Discord bot token and Youtube API key into the correct variables of config.json.
### Usage
Run the bot using
```
npm start
```
