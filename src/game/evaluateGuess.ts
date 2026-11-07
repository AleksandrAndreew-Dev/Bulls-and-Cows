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
  const totalMatching = guess
    .toLowerCase()
    .split("")
    .filter((char) => secret.includes(char)).length;

  const cows = totalMatching - bulls;

  return {
    bulls,
    cows,
  };
}
