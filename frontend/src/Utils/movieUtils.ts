export const returnAvailableSeats = () => {
  const AvailableSeats = [];
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  for (let num = 1; num < 11; num++) {
    for (const char of letters) {
      AvailableSeats.push(`${num}${char}`);
    }
  }
  return AvailableSeats;
};
