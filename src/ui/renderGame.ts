import { createElement } from "./utills/helpers.js";
import type { Game, GuessHistory } from "../types/types.js";

const baseLabels: Record<number, string> = {
  2: "bin (2)",
  8: "oct (8)",
  10: "dec (10)",
  16: "hex (16)",
};
export function renderGame(
  game: Game,
  resetGame: () => void,
  onCheckGuess: (guess: string) => void,
): HTMLElement {
  const container = createElement("div", "container");

  const title = createElement("h1", "title", "Bulls and Cows");
  container.append(title);

  const configLine = createElement(
    "p",
    "config",
    `
    Length: ${game.config.length},
    Base: ${baseLabels[game.config.base] ?? game.config.base}
    `,
  );
  container.append(configLine);
  const message = createElement("p", "message", "Guess the secret number");
  container.append(message);

  const inputGuess = createElement("input", "input-guess") as HTMLInputElement;
  inputGuess.type = "text";
  inputGuess.maxLength = game.config.length;
  container.append(inputGuess);

  const historyList = createElement("ul", "history-list");
  game.history.forEach((entry: GuessHistory) => {
    const item = createElement(
      "li",
      "",
      `${entry.guess} -> bulls: ${entry.result.bulls}, cows: ${entry.result.cows}`,
    );
    historyList.append(item);
  });

  container.append(historyList);

  const timerDisplay = createElement("div", "timer", "Time: 0s");
  container.append(timerDisplay);

  const btnNewGame = createElement("button", "btn-new-game", "New game");
  btnNewGame.addEventListener("click", () => {
    resetGame();
  });
  container.append(btnNewGame);

  const btnCheckGuess = createElement(
    "button",
    "btn-check-guess",
    "Check guess",
  );
  btnCheckGuess.addEventListener("click", () => {
    onCheckGuess(inputGuess.value);
  });
  container.append(btnCheckGuess);

  if (game.status === "end") {
    message.textContent = `You guessed the number: "${game.secret}"`;
    message.className = "message success";
  }

  return container;
}
