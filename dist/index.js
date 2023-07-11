// Credits: rosie for doing this idea before I ever could :(
require("network");
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
