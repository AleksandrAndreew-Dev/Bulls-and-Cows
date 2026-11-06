type Evaluation = {
  bulls: number;
  cows: number;
};

export function evaluateGuess(secret: string, guess: string): Evaluation {
  const fullMatch = guess === secret;
  if (fullMatch) {
    return {
      bulls: secret.length,
      cows: 0,
    };
  }
  const bulls = secret.split("").reduce((acc, char, index) => {
    return acc + (char === guess[index] ? 1 : 0);
  }, 0);
  let totalMatching = 0;
  for (const digit of guess) {
    if (secret.includes(digit)) {
      totalMatching += 1;
    }
  }
  const cows = totalMatching - bulls;

  return {
    bulls,
    cows,
  };
}
