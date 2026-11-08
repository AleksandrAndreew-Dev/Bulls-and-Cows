# Bulls and Cows — DESIGN.md

## 1. Структуры данных и алгоритмы

**`evaluateGuess(secret, guess)`**

1. Обе строки приводятся к нижнему регистру (`toLowerCase`), чтобы в `hex` символы `a` и `A` считались одной цифрой.
2. Если строки равны — возвращается `{ bulls: secret.length, cows: 0 }`.
3. **Bulls** считаются через `reduce` по индексам `secret`: сравнивается символ `secret[i]` и `guess[i]`.
4. Общее число совпадающих цифр (bulls + cows) считается через `filter` по `guess`: символ учитывается, если `secret` включает этот символ.
5. **Cows** = `totalMatching − bulls`.

**`countPossibleSecrets(length, base)`**

- Базовый случай: `length === 0` → `1`.
- Если `length > base` — выбрасывается `RangeError`.
- Рекуррентная формула: `count = base * countPossibleSecrets(length − 1, base − 1)`.
- Результат кэшируется в `Map` под ключом `${length}-${base}`; повторные вызовы с теми же параметрами возвращаются из кэша без пересчёта.

## 2. Сложность (Big O)

## 3. Принципы чистого кода

- **Чистые функции без побочных эффектов**: `evaluateGuess` (`src/game/evaluateGuess.ts`), `isValidGuess` (`src/game/isValidGuess.ts`), `generateSecret` (`src/game/generateSecret.ts`), `countPossibleSecrets` (`src/game/countPossibleSecrets.ts`), `createDigitValidator` (`src/game/createDigitValidator.ts`) — не мутируют аргументы, не зависят от DOM, результат зависит только от входных данных.
- **Функции высшего порядка**: `evaluateGuess` использует `reduce` и `filter` вместо ручных циклов со счётчиками (`src/game/evaluateGuess.ts`).
- **Каррирование**: `createDigitValidator(base)` возвращает функцию `(char) => boolean`, которая используется в `isValidGuess` и при фильтрации ввода (`src/game/createDigitValidator.ts`, `src/game/isValidGuess.ts`).
- **Мемоизация**: `countPossibleSecrets` кэширует результаты в `Map`, чтобы не пересчитывать при повторных вызовах (`src/game/countPossibleSecrets.ts`).

```

```
