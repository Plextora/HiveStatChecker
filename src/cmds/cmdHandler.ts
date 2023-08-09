import getAllTimeLB from "./getAllTimeLB";
import getPlayerAllTimeStats from "./getPlayerAllTimeStats";

export let cmdPrefix = "*";
export let cmds: Map<Function, string> = new Map<Function, string>([
  [getAllTimeLB, "get-all-time-lb"],
  [getPlayerAllTimeStats, "get-all-time-player-stats"],
]);
