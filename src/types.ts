/**
 * Basic information sent from The Hive's API relating to a player.
 * Not specific to any game mode
 */
export type PlayerApiResponse = {
  /**
   * The UUID (Universally Unique IDentifier) of the player.
   */
  UUID: string;
  /**
   * The amount of XP the player has in the game mode.
   */
  xp: number;
  /**
   * The amount of plays the player has in the game mode.
   */
  played: number;
  /**
   * The amount of wins the player has in the game mode.
   */
  victories: number;
  /**
   * The date the player first played the game mode, in UNIX timestamp form.
   */
  first_played: number;
  /**
   * The amount of kills a player has in the game mode.
   */
  kills?: number;
  /**
   * The amount of deaths a player has in the game mode.
   */
  deaths?: number;
};

/**
 * Basic information sent from The Hive's API relating to a game mode's leaderboard.
 * Not specific to any game mode
 */
export type LeaderboardApiResponse = {
  /**
   * The index of the player in the leaderboard.
   */
  index: number;
  /**
   * The human index (starting from 1 instead of 0) of the player in the leaderboard.
   */
  human_index: number;
  /**
   * The username of the player in the leaderboard.
   */
  username: string;
  /**
   * The UUID (Universally Unique IDentifier) of the player.
   */
  UUID: string;
  /**
   * The amount of XP the player in the leaderboard has.
   */
  xp: number;
  /**
   * The amount of plays the player in the leaderboard has.
   */
  played: number;
  /**
   * The amount of wins the player in the leaderboard has.
   */
  victories: number;
  /**
   * The amount of kills the player in the leaderboard has.
   */
  kills?: number;
  /**
   * The amount of deaths a player has in the game mode.
   */
  deaths?: number;
};

export interface HttpResponse {
  /**
   * The body, if the status code is 200 (OK)
   */
  body: Buffer;
  statusCode: number;

  /**
   * The http client error message.
   */
  error?: string;
}
