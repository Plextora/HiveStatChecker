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

const network = require("network");
function getAllTimeLB(args) {
    let gameMode = gameModeToGameCode(args[0]);
    let numberOfPositions = Number(args[1]);
    let request = network.getSync(`https://api.playhive.com/v0/game/all/${gameMode}`);
    if (request.statusCode === 200) {
        const response = JSON.parse(request.body);
        for (const i in response) {
            if (numberOfPositions < response[i].human_index) {
                break;
            }
            script.log(`§6#${response[i].human_index}§r | §b${response[i].username}§r | §a${response[i].victories} wins`);
        }
    }
    else if (request.statusCode === 404) {
        script.log("§cFailed to obtain leaderboard rankings.");
    }
}

let cmdPrefix = "*";
let cmds = new Map();
cmds.set(getAllTimeLB, "get-all-time-lb");

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
