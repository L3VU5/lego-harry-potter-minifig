export const selectRandomIndices = (
  totalItems: number,
  selectionLength: number
): number[] => {
  const usedIndices = new Set<number>();
  const randomIndices: number[] = [];

  while (randomIndices.length < selectionLength) {
    const randomIndex = Math.floor(Math.random() * totalItems);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      randomIndices.push(randomIndex);
    }
  }

  return randomIndices;
};
