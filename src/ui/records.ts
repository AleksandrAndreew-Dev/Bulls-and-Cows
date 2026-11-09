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
  recordsElement.append(createElement("h2", "records__title", "Best games"));

  if (records.length === 0) {
    recordsElement.append(
      createElement("p", "records__empty", "No games played yet."),
    );
    container.append(recordsElement);
    return;
  }

  const tableWrapper = createElement("div", "records__table-wrapper");
  const recordsTable = createElement("table", "records__table");
  const tableHead = createElement("thead");
  const headerRow = createElement("tr");
  ["Date", "Length", "Base", "Attempts", "Time"].forEach((label) => {
    const header = document.createElement("th");
    header.textContent = label;
    header.scope = "col";
    headerRow.append(header);
  });
  tableHead.append(headerRow);
  recordsTable.append(tableHead);

  const tableBody = createElement("tbody");
  records.forEach((record: GameRecord) => {
    const row = createElement("tr");
    const values = [
      new Date(record.date).toLocaleString(),
      record.length.toString(),
      record.base.toString(),
      record.attempts.toString(),
      `${(record.time / 1000).toFixed(1)} s`,
    ];
    values.forEach((value) => row.append(createElement("td", "", value)));
    tableBody.append(row);
  });

  recordsTable.append(tableBody);
  tableWrapper.append(recordsTable);
  recordsElement.append(tableWrapper);
  container.append(recordsElement);
}
