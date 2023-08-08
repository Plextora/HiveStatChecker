function gameModeToGameCode(gameMode) {
    const hiveGamemodes = new Map([
        ["TreasureWars", "wars"],
        ["Deathrun", "dr"],
        ["HideAndSeek", "hide"],
        ["SurvivalGames", "sg"],
        ["MurderMystery", "murder"],
        ["Skywars", "sky"],
        ["CaptureTheFlag", "ctf"],
        ["BlockDrop", "drop"],
        ["GroundWars", "ground"],
        ["JustBuild", "build"],
        ["BlockParty", "party"],
        ["TheBridge", "bridge"],
        ["Gravity", "gravity"],
    ]);
    return hiveGamemodes.get(gameMode);
}

const network$1 = require("network");
function getAllTimeLB(args) {
    let gameMode = gameModeToGameCode(args[0]);
    let numberOfPositions = Number(args[1]);
    let request = network$1.getSync(`https://api.playhive.com/v0/game/all/${gameMode}`);
    if (request.statusCode === 200) {
        const response = JSON.parse(request.body);
        for (const i in response) {
            if (numberOfPositions < response[i].human_index) {
                break;
            }
            script.log(`§l§6#${response[i].human_index}§r | §b${response[i].username}§r | §a${response[i].victories} wins`);
        }
    }
    else if (request.statusCode === 404) {
        script.log("§l§cFailed to obtain leaderboard rankings.\nExample usage: *get-all-time-lb Skywars <numOfPositions>");
    }
}

function kdrCalc(kills, deaths) {
    let KDR = kills / deaths;
    return Math.round((KDR + Number.EPSILON) * 100) / 100;
}

const network = require("network");
function getPlayerAllTimeStats(args) {
    let gameMode = gameModeToGameCode(args[0]);
    let player = args[1];
    let request = network.getSync(`https://api.playhive.com/v0/game/all/${gameMode}/${player}`);
    if (request.statusCode === 200) {
        const response = JSON.parse(request.body);
        script.log(`§l§6${player}`);
        script.log(`§6Games played: §l§6${response.played}`);
        script.log(`§6Wins: §l§6${response.victories}`);
        script.log(`§6Winrate: §l§6${Math.round(Math.floor((response.victories / response.played) * 1000) / 10)}%`);
        script.log(`§6Lossrate: §l§6${100 -
            Math.round(Math.floor((response.victories / response.played) * 1000) / 10)}%`);
        if (response.kills !== undefined) {
            script.log(`§6Kills: §l§6${response.kills}`);
        }
        script.log(`§6Deaths: §l§6${response.deaths}`);
        if (response.kills !== undefined) {
            script.log(`§6KDR: §l§6${kdrCalc(Number(response.kills), Number(response.deaths))}`);
        }
    }
    else if (request.statusCode === 404) {
        script.log("§l§cFailed to obtain player's statistics.");
    }
}

let cmdPrefix = "*";
let cmds = new Map();
cmds.set(getAllTimeLB, "get-all-time-lb");
cmds.set(getPlayerAllTimeStats, "get-all-time-player-stats");

// Credits: rosie for doing this idea before I ever could :(
script.name = "Hive Stat Checker";
script.description = "Check Hive statistics in-game";
script.version = "0.0.0";
script.author = "Plextora";
client.showNotification(`Script ${script.name} has been loaded!`);
let hiveStatCheckerModule = new Module("HiveStatChecker", script.name, script.description, 0 /* KeyCode.None */);
client.getModuleManager().registerModule(hiveStatCheckerModule);
client.on("unload-script", (ev) => {
    if (ev.scriptName === script.name) {
        client.getModuleManager().deregisterModule(hiveStatCheckerModule);
    }
});
client.on("send-chat", (ev) => {
    if (hiveStatCheckerModule.isEnabled()) {
        if (ev.message.startsWith(cmdPrefix)) {
            ev.cancel = true;
            const args = ev.message.substring(1).split(" ").slice(1);
            ev.message = ev.message.substring(1).split(" ")[0];
            for (const [key, value] of cmds.entries()) {
                if (ev.message === value) {
                    key(args);
                }
            }
        }
    }
});
