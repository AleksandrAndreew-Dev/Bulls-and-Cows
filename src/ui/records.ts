import type { GameRecord } from "../types/types.js";
import { createElement } from "./utills/helpers.js";
export function loadRecords(): GameRecord[] {
  return JSON.parse(localStorage.getItem("bulls-and-cows-records") || "[]");
}

export function saveRecords(record: GameRecord) {
  let currentRecords = loadRecords();
  currentRecords = [...currentRecords, record]
    .sort((a, b) => a.attempts - b.attempts)
    .sort((a, b) => a.time - b.time)
    .slice(0, 10);
  localStorage.setItem(
    "bulls-and-cows-records",
    JSON.stringify(currentRecords),
  );
}

export function renderRecords(container: HTMLElement): void {
  const records = loadRecords();
  const recordsElement = createElement("div", "records");
  const recordsList = createElement("ul", "record__list");
  records.forEach((record: GameRecord) => {
    recordsList.appendChild(createElement("li", "record__date", record.date));
    recordsList.appendChild(
      createElement("li", "record__length", record.length.toString()),
    );
    recordsList.appendChild(
      createElement("li", "record__base", record.base.toString()),
    );
    recordsList.appendChild(
      createElement("li", "record__attempts", record.attempts.toString()),
    );
    recordsList.appendChild(
      createElement("li", "record__time", record.time.toString()),
    );
  });
  recordsElement.append(recordsList);
  container.append(recordsElement);
}
