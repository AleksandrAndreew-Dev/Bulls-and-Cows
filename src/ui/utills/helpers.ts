type Element = HTMLElement;

export function createElement(
  tag: string,
  className?: string,
  text?: string,
): Element {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function createSelect(
  items: {
    value: string | number;
    label: string;
    disabled?: boolean;
  }[],
  className?: string,
): HTMLSelectElement {
  const select = createElement("select");
  if (className) select.className = className;
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = String(item.value);
    option.textContent = item.label;
    if (item.disabled) option.disabled = item.disabled;
    select.append(option);
  });
  return select as HTMLSelectElement;
}

export function clearBody(): void {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}
