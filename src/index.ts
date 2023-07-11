const network = require("network");

script.name = "Hive Stat Checker";
script.description = "Check Hive statistics in-game";
script.version = "0.0.0";
script.author = "Plextora";

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
