/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import { TreasureMapBot } from "./bot";
import { VERSION_CODE } from "./constants";

import {
    askAndParseEnv,
    identity,
    parseBoolean,
    parseLogin,
    requireAndParseEnv,
    askEnv,
} from "./lib";
import { sleep, sendLine } from "./api/line";
import fetch from "node-fetch";
import * as fs from "fs";

const fn_fetch_version = async (v: number) =>
    await fetch(
        `https://app.bombcrypto.io/android/com.senspark.bombcrypto-v${v}.apk`,
        {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
                Accept: "*/*",
                "Accept-Language": "th,en-US;q=0.7,en;q=0.3",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
            },
            method: "GET",
        }
    );

async function main() {
    const _bot: any[] = [];
    const _params: any[] = [];
    let version = VERSION_CODE;

    fs.readFile("./src/version.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        // pass data to int
        version = parseInt(data.trim());
    });

    let usr = 1;
    while (true) {
        const askUser = askEnv("LOGIN" + usr);
        // console.log("LOGIN" + usr, askUser);
        if (!askUser) break;
        _params.push(askUser);
        usr += 1;
    }
    console.log(`found user : ${_params.length}`);
    if (!_params.length) return console.log("no user found");

    let ok = 0;
    let err = 0;
    while (true) {
        let fetch_version = await fn_fetch_version(version);
        console.log(version, fetch_version.status);
        fetch_version = await fn_fetch_version(version);
        console.log(version, fetch_version.status);
        fetch_version = await fn_fetch_version(version);
        console.log(version, fetch_version.status);

        if (fetch_version.ok) {
            ok += 1;
            if (ok < 10) version += 1;
            if (ok >= 10) {
                version -= 1;
                break;
            }
        } else {
            if (ok == 0) version += 1;
            err += 1;
        }
        if (err >= 10) {
            version -= 1;
            break;
        }

    }
    console.log(`connect version : ${version}`);
    fs.writeFile("./src/version.txt", version + "", function (err) {
        if (err) throw err;
        console.log(`current version : ${version}`);
    });

    for (let i = 0; i < _params.length; i++) {
        const params = requireAndParseEnv(`LOGIN${i + 1}`, parseLogin);
        const LINE_API = askAndParseEnv(`LINE_API${i + 1}`, identity, "");
        const modeAmazon = Boolean(askEnv(`MODE_AMAZON${i + 1}`));
        const modeAdventure = Boolean(askEnv(`MODE_ADVENTURE${i + 1}`));

        // console.log("start", params);
        const minHeroEnergyPercentage = parseInt(
            askAndParseEnv(`MIN_HERO_ENERGY_PERCENTAGE${i + 1}`, identity, "50")
        );
        const bot = new TreasureMapBot(params, {
            VERSION: version,
            telegramKey: askAndParseEnv(`TELEGRAM_KEY${i + 1}`, identity, ""),
            minHeroEnergyPercentage: minHeroEnergyPercentage,
            modeAmazon: modeAmazon,
            modeAdventure: modeAdventure,
            houseHeroes: askAndParseEnv(`HOUSE_HEROES${i + 1}`, identity, ""),
            LINE_API: LINE_API,
        });
        console.log(
            params,
            minHeroEnergyPercentage,
            `, modeAmazon : ${!!modeAmazon} , modeAdventure : ${!!modeAdventure}`
        );
        _bot.push(bot);
    }

    for (const bot of _bot) {
        bot.loop();
    }

    process.once("SIGINT", () => {
        for (let i = 0; i < _bot.length; i++) {
            _bot[i].stop();
            process.exit();
        }
    });
    process.once("SIGTERM", () => {
        for (let i = 0; i < _bot.length; i++) {
            _bot[i].stop();
            process.exit();
        }
    });
}

main();
