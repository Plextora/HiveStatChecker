// Credits: rosie for doing this idea before I ever could :(

import * as cmdHandler from "./cmds/cmdHandler";

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

client.on("send-chat", (ev) => {
  if (hiveStatCheckerModule.isEnabled()) {
    if (ev.message.startsWith(cmdHandler.cmdPrefix)) {
      ev.cancel = true;
      const args: string[] = ev.message.substring(1).split(" ").slice(1);
      ev.message = ev.message.substring(1).split(" ")[0];
      for (const [key, value] of cmdHandler.cmds.entries()) {
        if (ev.message === value) {
          key(args);
        }
      }
    }
  }
});