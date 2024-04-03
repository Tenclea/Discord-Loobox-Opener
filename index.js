import * as readline from 'readline';
import fetch from 'node-fetch';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const token = await new Promise(r => rl.question('Input your token: ', r));

async function openBox() {
    return fetch("https://discord.com/api/v9/users/@me/lootboxes/open", {
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
            "Accept": "*/*",
            "Authorization": token,
            "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjEyNC4wKSBHZWNrby8yMDEwMDEwMSBGaXJlZm94LzEyNC4wIiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTI0LjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6Imh0dHBzOi8vdGV0cmF6ZXJvLmNvbS8iLCJyZWZlcnJpbmdfZG9tYWluIjoidGV0cmF6ZXJvLmNvbSIsInJlZmVycmVyX2N1cnJlbnQiOiJodHRwczovL2Rpc2NvcmQuY29tLyIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6ImRpc2NvcmQuY29tIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MjgwNDU4LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        },
        "referrer": "https://discord.com/shop",
        "method": "POST",
    }).then(r => r.json()).catch(() => { });
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

for (; ; await wait(5000)) {
    const res = await openBox();
    if (!res) {
        console.error('Request failed.');
        continue;
    }

    if (res.code == 0) {
        console.error('The provided token seems to be invalid.');
        process.exit(1);
    }

    if (res.retry_after) {
        console.error(`Rate limited for: ${res.retry_after}s`);
        await wait(res.retry_after * 1000 - 5000);
        continue;
    }

    const prize = res.opened_item;
    if (!prize) {
        console.error('An unknown error has occureed:', res);
        continue;
    }

    console.log('Congrats! You just got a: ' + {
        '1214340999644446726': 'Quack!!', '1214340999644446724': '⮕⬆⬇⮕⬆⬇', '1214340999644446722': 'Wump Shell',
        '1214340999644446720': 'Buster Blade', '1214340999644446725': 'Power Helmet', '1214340999644446723': 'Speed Boost',
        '1214340999644446721': 'Cute Plushie', '1214340999644446728': 'Dream Hammer', '1214340999644446727': 'OHHHHH BANANA',
    }[prize]);
}
