// Credits: rosie for doing this idea before I ever could :(

import * as cmdHandler from "./cmds/cmdHandler";

let hiveStatCheckerModule: Module = new Module(
  "HiveStatChecker",
  "Hive Stat Checker",
  "Check Hive statistics in-game",
  KeyCode.None
);

client.on("send-chat", (ev) => {
  if (hiveStatCheckerModule.isEnabled()) {
    if (ev.message.startsWith(cmdHandler.cmdPrefix)) {
      let message = ev.message;
      ev.cancel = true;
      const args: string[] = message.substring(1).split(" ").slice(1);
      message = message.substring(1).split(" ")[0];
      for (const [key, value] of cmdHandler.cmds.entries()) {
        if (message === value) {
          key(args);
        }
      }
    }
  }
});

client.getModuleManager().registerModule(hiveStatCheckerModule);
