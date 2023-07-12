import getAllTimeLB from "./getAllTimeLB";

export let cmdPrefix = "*";
export let cmds: Map<Function, string> = new Map<Function, string>();
cmds.set(getAllTimeLB, "get-all-time-lb");
