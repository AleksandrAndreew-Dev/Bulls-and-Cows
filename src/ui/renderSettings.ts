import { createElement, createSelect } from "./utills/helpers.js";
import { renderRecords } from "./records.js";

import type { Base } from "../types/types.js";
export function renderSettings(
  onStart: (length: number, base: Base) => void,
): HTMLElement {
  const container = createElement("div");

  const settingsTitle = createElement("h2", "title", "Settings");
  container.append(settingsTitle);

  const lengthItems = [2, 3, 4, 5, 6].map((length) => {
    return {
      value: length,
      label: String(length),
    };
  });
  const lengthSelect = createSelect(lengthItems, "input-length");

  const baseItems = [
    { value: 2, label: "bin (2)" },
    { value: 8, label: "oct (8)" },
    { value: 10, label: "dec (10)" },
    { value: 16, label: "hex (16)" },
  ];

  const baseSelect = createSelect(baseItems, "input-base");

  const btnStart = createElement("button", "btn-start", "Start");
  btnStart.addEventListener("click", () => {
    const length = Number(lengthSelect.value);
    const base = Number(baseSelect.value) as Base;
    onStart(length, base);
  });

  baseSelect.addEventListener("change", () => {
    updateLengthOptions();
  });

  function updateLengthOptions(): void {
    const base = Number(baseSelect.value);
    const isBinary = base === 2;
    lengthSelect.querySelectorAll("option").forEach((option) => {
      const length = Number(option.value);
      if (isBinary && length !== 2) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
  }
  baseSelect.addEventListener("change", updateLengthOptions);
  updateLengthOptions();
  container.append(lengthSelect, baseSelect, btnStart);
  renderRecords(container);

  return container;
}
