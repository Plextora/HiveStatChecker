const fs = require("filesystem");
import { setCmdPrefix } from "./cmdHandler";

export default function changePrefix(args: string[]) {
  let newPrefix: string = args[0];
  if (newPrefix.length == 1) {
    fs.write("../commandPrefix.txt", util.stringToBuffer(newPrefix));
    setCmdPrefix(newPrefix);
    clientMessage(
      decodeURI(
        `\u00A7l\u00A72HiveStatChecker's command prefix is now \u00A7e${newPrefix}\u00A7l\u00A72!`
      )
    );
  } else {
    clientMessage(decodeURI("\u00A7l\u00A7cPrefix should be 1 character!"));
  }
}
