# b_bot
[![Depfu](https://badges.depfu.com/badges/e6db7ca22f4528ae72f1a805d985396a/overview.svg)](https://depfu.com/github/zhaobenny/b_bot?project_id=13550)

**Not used anymore**

~~Custom Discord Bot used for a personal server.~~ 

###  Installation
Inital setup instructions (for myself if I forget)
```
sudo apt install build-essential
git clone https://github.com/zhaobenny/b_bot.git
cd b_bot
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install
```
Requires a [Lavalink server.](https://github.com/Frederikam/Lavalink)

Make a copy of the exampleconfig.json and rename it to config.json.

Fill in the the correct variables of the config.json.
### Usage
Start the LavaLink server, then run the bot using
```
npm start
```
