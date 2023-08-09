export default function gameModeToGameCode(gameMode: string): string {
  const hiveGamemodes: Map<string, string> = new Map<string, string>([
    ["TreasureWars", "wars"],
    ["Deathrun", "dr"],
    ["HideAndSeek", "hide"],
    ["SurvivalGames", "sg"],
    ["MurderMystery", "murder"],
    ["Skywars", "sky"],
    ["CaptureTheFlag", "ctf"],
    ["BlockDrop", "drop"], // this is a gamemode?? never heard of it.
    ["GroundWars", "ground"],
    ["JustBuild", "build"],
    ["BlockParty", "party"],
    ["TheBridge", "bridge"],
    ["Gravity", "grav"],
  ]);

  return hiveGamemodes.get(gameMode)!;
}
