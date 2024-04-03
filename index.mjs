import * as readline from 'readline';
import chalk from 'chalk';
import fetch from 'node-fetch';
import { clear } from 'console';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let token;
let boxesOpened = 0;
let rewardsHistory = [];

// Vérifier si les dépendances sont installées
const checkDependencies = async () => {
  console.log(chalk.cyan('Checking dependencies...'));
  try {
    require.resolve('chalk');
    require.resolve('node-fetch');
    console.log(chalk.green('Dependencies installed!'));
  } catch (error) {
    console.log(chalk.red('Missing dependencies, installing now...'));
    await installDependencies();
  }
}

// Installer les dépendances manquantes
async function installDependencies() {
  try {
    const { execSync } = await import('child_process');
    execSync('npm install chalk node-fetch');
    console.log(chalk.green('Dependencies installed successfully!'));
  } catch (error) {
    console.error(chalk.red('Error installing dependencies:'), error);
    process.exit(1);
  }
}

// Effacer la console
const clearConsole = () => {
  console.clear();
  console.log('\n');
}

// Ouvrir une boîte
const openBox = async () => {
  if (boxesOpened === 0) {
    clearConsole();
  }

  try {
    const response = await fetch('https://discord.com/api/v9/users/@me/lootboxes/open', {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
        "Accept": "*/*",
        "Authorization": token,
        "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEyNC4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEyNC4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTI0LjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6Imh0dHBzOi8vdGV0cmF6ZXJvLmNvbS8iLCJyZWZlcnJpbmdfZG9tYWluIjoidGV0cmF6ZXJvLmNvbSIsInJlZmVycmVyX2N1cnJlbnQiOiJodHRwczovL2Rpc2NvcmQuY29tLyIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6ImRpc2NvcmQuY29tIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MjgwNDU4LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
      },
      referrer: "https://discord.com/shop",
      method: "POST",
    });

    if (!response.ok) {
      console.error(chalk.red('Request failed.'));
      return;
    }

    const data = await response.json();

    if (data.code === 0) {
      console.error(chalk.red('The provided token seems to be invalid.'));
      process.exit(1);
    }

    if (data.retry_after) {
      console.error(chalk.yellow(`Rate limited for: ${data.retry_after}s`));
      await wait(data.retry_after * 1000 - 5000);
      return;
    }

    const prize = data.opened_item;
    if (!prize) {
      console.error(chalk.red(`An unknown error has occurred: ${JSON.stringify(data)}`));
      return;
    }

    console.log(`${chalk.green('🎉')} ${chalk.bold('CONGRATS!')} You just got a: ${chalk.bold(getPrizeName(prize))}`);
    boxesOpened++;

    // Ajouter la récompense à l'historique
    rewardsHistory.unshift({ prize: getPrizeName(prize), timestamp: new Date() });
    if (rewardsHistory.length > 15) {
      rewardsHistory.pop();
    }

  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
  }

  await wait(5000);

  // Afficher le compte de boîtes ouvertes et l'historique des récompenses après la première ouverture
  if (boxesOpened > 0) {
    clearConsole();
    console.log(`${chalk.blue('🎁')} ${chalk.bold('Boxes opened:')} ${boxesOpened}`);

    // Afficher l'historique des récompenses
    for (let i = 0; i < rewardsHistory.length; i++) {
      const reward = rewardsHistory[i];
      console.log(`${chalk.gray(`${i + 1}. ${reward.prize} - ${reward.timestamp.toLocaleString()}`)}`);
    }
  }

  await openBox();
}

// Attendre
const wait = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Obtenir le nom du prix
const getPrizeName = (prize) => {
  const prizeMap = {
    '1214340999644446726': 'Quack!!',
    '1214340999644446724': '⮕⬆⬇⮕⬆⬇',
    '1214340999644446722': 'Wump Shell',
    '1214340999644446720': 'Buster Blade',
    '1214340999644446725': 'Power Helmet',
    '1214340999644446723': 'Speed Boost',
    '1214340999644446721': 'Cute Plushie',
    '1214340999644446728': 'Dream Hammer',
    '1214340999644446727': 'OHHHHH BANANA',
  };

  return prizeMap[prize] || 'Unknown prize';
}

// Lancer le script
clearConsole();
checkDependencies().then(() => {
  rl.question('Input your token: ', async (inputToken) => {
    token = inputToken;
    await openBox();
  });
});
