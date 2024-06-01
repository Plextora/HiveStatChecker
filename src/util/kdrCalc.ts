export function kdrCalc(kills: number, deaths: number) {
  let KDR = kills / deaths;
  return Math.round((KDR + Number.EPSILON) * 100) / 100;
}

export function kdrCalcMulti(kills: number, kills2: number, deaths: number) {
  let totalKills = kills + kills2;
  let KDR = totalKills / deaths;

  return Math.round((KDR + Number.EPSILON) * 100) / 100;
}

export function winLossCalc(wins: number, gamesPlayed: number) {
  let winLoss = wins / gamesPlayed;
  return Math.round((winLoss + Number.EPSILON) * 100) / 100;
}
