# Discord Loot Box Opener 🎁

This project automates the process of opening loot boxes on Discord using a user's token. Follow these steps to set up and run the script. 

## Disclaimer ⚠️

This project is a Proof of Concept (POC) and is for educational purposes only. Using selfbot tools or scripts to automate actions on Discord, including opening loot boxes, is prohibited by Discord's Terms of Service. Utilizing this script on live Discord accounts can lead to account suspension or termination. Always use responsibly and ethically, and never use it in a way that violates Discord's Terms of Service.


## Pre-requisites 📋
- [Node.js](https://nodejs.org/en/download) installed on your computer.
- Your Discord token. (⚠️ **Never share your token with others**)

## Running the Script 🚀

1. **Start the Script**

In the project directory, open your terminal or command prompt and run:

```
node index.js
```

This will start the script.

2. **Input Your Token**

The script will prompt you to 'Input your token: '. Paste your Discord token here and press Enter. 

⚠️ The script does not store your token anywhere, but always be cautious with your token to avoid misuse.

3. **Profits!**

The script will now start opening loot boxes once every 5 seconds for you. Enjoy!

## How it Works 🧩

- The script uses your token to make authorized requests to Discord for opening loot boxes.
- It automatically handles rate limits imposed by Discord and retries opening a loot box after the specified wait time.
- Upon successfully opening a loot box, it will log the item you received to the console.

## Troubleshooting 🛠

- **Invalid Token**: If you receive a 'The provided token seems to be invalid.' message, double-check your token and try again.
- **Rate Limits**: If rate-limited, the script will automatically wait and retry. No action is needed from your side.
- If your issue persists, feel free to open up an issue, describing as precisely as possible what is going wrong.

## Security Note 🔐

- Your token is like a key to your Discord account. Never share it and only use it in trusted applications.

## Contributing 🤝

Feel free to fork the project, make improvements, and submit pull requests. We're always looking to make our projects better!

---

Happy Loot Box Opening! 🎉