export const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];

  for (let index = newArray.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [newArray[index], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[index],
    ];
  }

  return newArray;
};