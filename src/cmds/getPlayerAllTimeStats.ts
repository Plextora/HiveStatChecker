import gameModeToGameCode from "../util/gameModeToGameCode";
import { kdrCalc } from "../util/kdrCalc";
const network = require("network");

export default function getPlayerAllTimeStats(args: string[]) {
  let gameMode: string = gameModeToGameCode(args[0])!;
  let player: string = args[1];

  let request = network.getSync(
    `https://api.playhive.com/v0/game/all/${gameMode}/${player}`
  );

  if (request.statusCode === 200) {
    const response: any = JSON.parse(request.body);
    script.log(`§l§6${player}`);
    script.log(`§eGames played: ${response.played}`);
    script.log(`§eWins: ${response.victories}`);
    script.log(
      `§eWinrate: ${Math.round(
        Math.floor((response.victories / response.played) * 1000) / 10
      )}%`
    );
    script.log(
      `§eLossrate: ${
        100 -
        Math.round(
          Math.floor((response.victories / response.played) * 1000) / 10
        )
      }%`
    );
    if (response.kills !== undefined) {
      script.log(`§eKills: ${response.kills}`);
    }
    script.log(`§eDeaths: ${response.deaths}`);
    if (response.kills !== undefined) {
      script.log(
        `§eKDR: ${kdrCalc(Number(response.kills), Number(response.deaths))}`
      );
    }
  } else if (request.statusCode === 404) {
    script.log("§cFailed to obtain player's statistics.");
  }
}
