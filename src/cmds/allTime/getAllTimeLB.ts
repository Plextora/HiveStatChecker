import gameModeToGameCode from "../../util/gameModeToGameCode";
const network = require("network");

export default function getAllTimeLB(args: string[]) {
  let gameMode: string = args[0];
  let gameCode: string = gameModeToGameCode(gameMode)!;
  let numberOfPositions: number = Number(args[1]);

  let request = network.get(`https://api.playhive.com/v0/game/all/${gameCode}`);

  if (request.statusCode === 200) {
    const response: any = JSON.parse(util.bufferToString(request.body));
    clientMessage(
      decodeURI(
        `\u00A7l\u00A76${gameMode} Leaderboard\n-----------------------`
      )
    );
    for (const i in response) {
      if (numberOfPositions < response[i].human_index) {
        break;
      }
      clientMessage(
        decodeURI(
          `\u00A7l\u00A76#${response[i].human_index}\u00A7r | \u00A7b${response[i].username}\u00A7r | \u00A7a${response[i].victories} wins`
        )
      );
    }
  } else if (request.statusCode === 404) {
    clientMessage(
      decodeURI(
        "\u00A7l\u00A7cFailed to obtain leaderboard rankings.\nExample usage: get-all-time-lb Skywars <numOfPositions>"
      )
    );
  }
}
