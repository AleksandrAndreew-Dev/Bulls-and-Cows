import { StartGame, isValidGuess, makeGuess } from "../game/index.js";
import { renderSettings } from "./renderSettings.js";
import { renderGame } from "./renderGame.js";
import { clearBody } from "./utills/helpers.js";
import { saveRecords } from "./records.js";

import type { Game, Base, GameRecord } from "../types/types.js";

let game: Game | null = null;
let timerId: ReturnType<typeof setInterval> | null = null;
let startTime = 0;

function startGame(length: number, base: Base) {
  game = StartGame({ length, base });
  startTime = Date.now();
  clearBody();

  const container = renderGame(game, resetGame, handleGuess);
  document.body.append(container);

  const timerElement = container.querySelector(".timer") as HTMLElement;
  startTimer(timerElement);
}

function resetGame() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  game = null;
  clearBody();
  const settingsElement = renderSettings(startGame);
  document.body.append(settingsElement);
}

function startTimer(timerElement: HTMLElement) {
  timerId = setInterval(() => {
    if (!game) return;
    const time = Date.now() - startTime;
    timerElement.textContent = `Time: ${Math.floor(time / 1000)}s`;
  }, 1000);
}
const settingsElement = renderSettings(startGame);
document.body.append(settingsElement);

function handleGuess(guess: string) {
  if (!game) return;

  if (!isValidGuess(guess, game.config.length, game.config.base)) {
    showMessage("Invalid guess");
    return;
  }
  game = makeGuess(game, guess);
  const inputGuess = document.querySelector(".input-guess") as HTMLInputElement;
  inputGuess.value = "";

  if (game.status === "end") {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    const record: GameRecord = {
      length: game.config.length,
      base: game.config.base,
      attempts: game.history.length,
      time: Date.now() - startTime,
      date: new Date().toISOString(),
    };
    saveRecords(record);
  }

  clearBody();

  const container = renderGame(game, resetGame, handleGuess);
  document.body.append(container);
  if (game.status !== "end") {
    const timer = container.querySelector(".timer") as HTMLElement;
    startTimer(timer);
  }
}

function showMessage(text: string, type: "error" | "success" = "error") {
  const el = document.querySelector(".message") as HTMLElement;
  if (!el) return;
  el.textContent = text;
  el.className = `message ${type}`;
  setTimeout(() => {
    el.textContent = "";
    el.className = "message";
  }, 1500);
}
