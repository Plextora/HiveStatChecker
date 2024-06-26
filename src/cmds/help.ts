import { cmdPrefix } from "./cmdHandler";

export default function help(args: string[]) {
  clientMessage(
    decodeURI(
      "\u00A7l\u00A79Hive Stat Checker Commands:\n-----------------------"
    )
  );
  clientMessage(
    decodeURI(
      `\u00A7c${cmdPrefix}\u00A7l\u00A76get-all-time-lb\n\u00A7r\u00A7eSyntax: \u00A7fget-all-time-lb <GameMode> <NumberOfPositionsShown>`
    )
  );
  clientMessage(
    decodeURI(
      `\u00A7c${cmdPrefix}\u00A7l\u00A76get-all-time-player-stats\n\u00A7r\u00A7eSyntax: \u00A7fget-all-time-player-stats <GameMode> <Player>`
    )
  );
  clientMessage(
    decodeURI(
      `\u00A7c${cmdPrefix}\u00A7l\u00A76get-monthly-lb\n\u00A7r\u00A7eSyntax: \u00A7fget-monthly-lb <GameMode> <NumberOfPositionsShown>`
    )
  );
  clientMessage(
    decodeURI(
      `\u00A7c${cmdPrefix}\u00A7l\u00A76get-monthly-player-stats\n\u00A7r\u00A7eSyntax: \u00A7fget-monthly-player-stats <GameMode> <Player>`
    )
  );
  clientMessage(
    decodeURI(
      `\u00A7c${cmdPrefix}\u00A7l\u00A76change-prefix\n\u00A7r\u00A7eSyntax: \u00A7fchange-prefix <NewPrefixCharacter>`
    )
  );
}
