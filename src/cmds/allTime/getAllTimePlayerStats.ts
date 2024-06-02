import gameModeToGameCode from "../../util/gameModeToGameCode";
import { kdrCalc, winLossCalc } from "../../util/calc";
const network = require("network");

export default function getAllTimePlayerStats(args: string[]) {
  let gameMode: string = gameModeToGameCode(args[0])!;
  // maybe i shouldn't of used an args system because xbox gamertags can have spaces
  // now i have to do this weird ass array/string manipulation to get an actual player string
  let player: string = args.slice(1).join(" ");

  let request = network.get(
    `https://api.playhive.com/v0/game/all/${gameMode}/${player}`
  );

  if (request.statusCode === 200) {
    const response: any = JSON.parse(util.bufferToString(request.body));
    clientMessage(decodeURI(`\u00A7l\u00A76${player}`));
    if (response.victories !== undefined && response.played !== undefined) {
      clientMessage(
        decodeURI(`\u00A7eGames played: \u00A7l\u00A7f${response.played}`)
      );
      clientMessage(
        decodeURI(`\u00A7eWins: \u00A7l\u00A7f${response.victories}`)
      );
      clientMessage(
        decodeURI(
          `\u00A7eW/L: \u00A7l\u00A7f${winLossCalc(
            Number(response.victories),
            Number(response.played)
          )}`
        )
      );
    }
    if (response.kills !== undefined && response.deaths !== undefined) {
      clientMessage(decodeURI(`\u00A7eKills: \u00A7l\u00A7f${response.kills}`));
      clientMessage(
        decodeURI(`\u00A7eDeaths: \u00A7l\u00A7f${response.deaths}`)
      );
      clientMessage(
        decodeURI(
          `\u00A7eKDR: \u00A7l\u00A7f${kdrCalc(
            Number(response.kills),
            Number(response.deaths)
          )}`
        )
      );
    }
  } else if (request.statusCode === 404) {
    clientMessage(
      decodeURI(
        "\u00A7l\u00A7cFailed to obtain player's statistics.\nExample usage: get-all-time-player-stats <GameMode> <Player>"
      )
    );
  }
}
