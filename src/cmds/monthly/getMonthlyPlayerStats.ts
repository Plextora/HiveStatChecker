import gameModeToGameCode from "../../util/gameModeToGameCode";
import { kdrCalc, winLossCalc } from "../../util/calc";
import { cmdPrefix } from "../cmdHandler";
import { PlayerApiResponse, HttpResponse } from "../../types";
const network = require("network");

export default function getMonthlyPlayerStats(args: string[]) {
  let gameMode: string = args[0];
  let gameCode: string = gameModeToGameCode(gameMode)!;
  // maybe i shouldn't of used an args system because xbox gamertags can have spaces
  // now i have to do this weird ass array/string manipulation to get an actual player string
  let player: string = args.slice(1).join(" ");

  let request: HttpResponse = network.get(
    `https://api.playhive.com/v0/game/monthly/player/${gameCode}/${player}`
  );

  if (request.statusCode === 200) {
    const response: PlayerApiResponse = JSON.parse(
      util.bufferToString(request.body)
    );
    clientMessage(
      decodeURI(
        `\u00A7l\u00A76${player}'s Monthly ${gameMode} Stats\n-----------------------`
      )
    );
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
            response.victories,
            response.played
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
            response.kills,
            response.deaths
          )}`
        )
      );
    }
  } else if (request.statusCode === 404) {
    clientMessage(
      decodeURI(
        `\u00A7l\u00A7cFailed to obtain player's statistics.\nExample usage: ${cmdPrefix}get-all-time-player-stats TheBridge ${game
          .getLocalPlayer()
          ?.getName()}`
      )
    );
  }
}
