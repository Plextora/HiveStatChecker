import gameModeToGameCode from "../../util/gameModeToGameCode";
const network = require("network");

export default function getAllTimeLB(args: string[]) {
  let gameMode: string = gameModeToGameCode(args[0])!;
  let numberOfPositions: number = Number(args[1]);

  let request = network.getSync(
    `https://api.playhive.com/v0/game/all/${gameMode}`
  );

  if (request.statusCode === 200) {
    const response: any = JSON.parse(util.bufferToString(request.body));
    for (const i in response) {
      if (numberOfPositions < response[i].human_index) {
        break;
      }
      script.log(
        `§l§6#${response[i].human_index}§r | §b${response[i].username}§r | §a${response[i].victories} wins`
      );
    }
  } else if (request.statusCode === 404) {
    script.log(
      "§l§cFailed to obtain leaderboard rankings.\nExample usage: *get-all-time-lb Skywars <numOfPositions>"
    );
  }
}
