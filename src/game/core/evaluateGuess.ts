type Evaluation = {
  bulls: number;
  cows: number;
};

export function evaluateGuess(secret: string, guess: string): Evaluation {
  const secretLower = secret.toLowerCase();
  const guessLower = guess.toLowerCase();

  if (guessLower === secretLower) {
    return {
      bulls: secretLower.length,
      cows: 0,
    };
  }
  const bulls = secretLower.split("").reduce((acc, char, index) => {
    return acc + (char === guessLower[index] ? 1 : 0);
  }, 0);
  const totalMatching = guessLower
    .split("")
    .filter(
      (char, index, self) =>
        self.indexOf(char) === index && secretLower.includes(char),
    ).length;

  const cows = totalMatching - bulls;

  return {
    bulls,
    cows,
  };
}
