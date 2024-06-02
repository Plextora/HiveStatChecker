export function kdrCalc(kills: number, deaths: number) {
  let KDR = kills / deaths;
  return Math.round((KDR + Number.EPSILON) * 100) / 100;
}

export function kdrCalcMulti(kills: number, kills2: number, deaths: number) {
  let totalKills = kills + kills2;
  let KDR = totalKills / deaths;

  return Math.round((KDR + Number.EPSILON) * 100) / 100;
}

export function winrateCalc(wins: number, gamesPlayed: number) {
  return Math.round(Math.floor((wins / gamesPlayed) * 1000) / 10);
}

export function lossrateCalc(wins: number, gamesPlayed: number) {
  return 100 - Math.round(Math.floor((wins / gamesPlayed) * 1000) / 10);
}
