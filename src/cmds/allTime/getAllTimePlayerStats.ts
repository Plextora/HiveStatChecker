import gameModeToGameCode from "../../util/gameModeToGameCode";
import { kdrCalc } from "../../util/kdrCalc";
const network = require("network");

export default function getAllTimePlayerStats(args: string[]) {
  let gameMode: string = gameModeToGameCode(args[0])!;
  let player: string = args[1];

  let request = network.get(
    `https://api.playhive.com/v0/game/all/${gameMode}/${player}`
  );

  if (request.statusCode === 200) {
    const response: any = JSON.parse(util.bufferToString(request.body));
    clientMessage(decodeURI(`\u00A7l\u00A76${player}`));
    clientMessage(
      decodeURI(`\u00A7eGames played: \u00A7l\u00A7f${response.played}`)
    );
    clientMessage(
      decodeURI(`\u00A7eWins: \u00A7l\u00A7f${response.victories}`)
    );
    clientMessage(
      decodeURI(
        `\u00A7eWinrate: \u00A7l\u00A7f${Math.round(
          Math.floor((response.victories / response.played) * 1000) / 10
        )}%25`
      )
    );
    clientMessage(
      decodeURI(
        `\u00A7eLossrate: \u00A7l\u00A7f${
          100 -
          Math.round(
            Math.floor((response.victories / response.played) * 1000) / 10
          )
        }%25`
      )
    );
    if (response.kills !== undefined) {
      clientMessage(decodeURI(`\u00A7eKills: \u00A7l\u00A7f${response.kills}`));
    }
    clientMessage(decodeURI(`\u00A7eDeaths: \u00A7l\u00A7f${response.deaths}`));
    if (response.kills !== undefined) {
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
      decodeURI("\u00A7l\u00A7cFailed to obtain player's statistics.")
    );
  }
}
