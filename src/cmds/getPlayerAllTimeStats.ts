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
    script.log(`§6Games played: §l§6${response.played}`);
    script.log(`§6Wins: §l§6${response.victories}`);
    script.log(
      `§6Winrate: §l§6${Math.round(
        Math.floor((response.victories / response.played) * 1000) / 10
      )}%`
    );
    script.log(
      `§6Lossrate: §l§6${
        100 -
        Math.round(
          Math.floor((response.victories / response.played) * 1000) / 10
        )
      }%`
    );
    if (response.kills !== undefined) {
      script.log(`§6Kills: §l§6${response.kills}`);
    }
    script.log(`§6Deaths: §l§6${response.deaths}`);
    if (response.kills !== undefined) {
      script.log(
        `§6KDR: §l§6${kdrCalc(Number(response.kills), Number(response.deaths))}`
      );
    }
  } else if (request.statusCode === 404) {
    script.log("§l§cFailed to obtain player's statistics.");
  }
}
