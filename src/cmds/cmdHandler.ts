import getAllTimeLB from "./getAllTimeLB";
import getPlayerAllTimeStats from "./getPlayerAllTimeStats";

export let cmdPrefix = "*";
export let cmds: Map<Function, string> = new Map<Function, string>();
cmds.set(getAllTimeLB, "get-all-time-lb");
cmds.set(getPlayerAllTimeStats, "get-all-time-player-stats");
