// Credits: rosie for doing this idea before I ever could :(

const network = require("network");

script.name = "Hive Stat Checker";
script.description = "Check Hive statistics in-game";
script.version = "0.0.0";
script.author = "Plextora";

const hiveGamemodes: Map<string, string> = new Map<string, string>([
  ["Treasure Wars", "wars"],
  ["Deathrun", "dr"],
  ["Hide and Seek", "hide"],
  ["Survival Games", "sg"],
  ["Murder Mystery", "murder"],
  ["Skywars", "sky"],
  ["Capture the Flag", "ctf"],
  ["Block Drop", "drop"], // this is a gamemode?? never heard of it.
  ["Ground Wars", "ground"],
  ["Just Build", "build"],
  ["Block Party", "party"],
  ["The Bridge", "bridge"],
  ["Gravity", "gravity"],
]);

client.showNotification(`Script ${script.name} has been loaded!`);

let hiveStatCheckerModule: Module = new Module(
  "HiveStatChecker",
  script.name,
  script.description,
  KeyCode.None
);

client.getModuleManager().registerModule(hiveStatCheckerModule);

client.on("unload-script", (ev) => {
  if (ev.scriptName === script.name) {
    client.getModuleManager().deregisterModule(hiveStatCheckerModule);
  }
});

function getAllTimeLB(gameCode: string) {
  let request = network.getSync(
    `https://api.playhive.com/v0/game/all/${gameCode}`
  );
  if (request.statusCode === 200) {
    const response: any = JSON.parse(request.body);
    for (const i in response) {
      script.log(
        `§6#${response[i].human_index}§r | §b${response[i].username}§r | §a${response[i].victories} wins`
      );
    }
  }
}
