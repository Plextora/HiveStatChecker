import help from "./help";
import getAllTimeLB from "./allTime/getAllTimeLB";
import getAllTimePlayerStats from "./allTime/getAllTimePlayerStats";

export let cmdPrefix = "*";
export let cmds: Map<Function, string> = new Map<Function, string>([
  [help, "help"],
  [getAllTimeLB, "get-all-time-lb"],
  [getAllTimePlayerStats, "get-all-time-player-stats"],
]);
