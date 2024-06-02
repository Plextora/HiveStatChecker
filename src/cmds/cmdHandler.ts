const fs = require("filesystem");
import help from "./help";
import getAllTimeLB from "./allTime/getAllTimeLB";
import getAllTimePlayerStats from "./allTime/getAllTimePlayerStats";
import changePrefix from "./changePrefix";

export let cmdPrefix: string;

cmdPrefix = util.bufferToString(fs.read("../commandPrefix.txt"));

// :trol:
export function setCmdPrefix(newPrefix: string) {
  cmdPrefix = newPrefix;
}

export let cmds: Map<Function, string> = new Map<Function, string>([
  [help, "help"],
  [getAllTimeLB, "get-all-time-lb"],
  [getAllTimePlayerStats, "get-all-time-player-stats"],
  [changePrefix, "change-prefix"],
]);
