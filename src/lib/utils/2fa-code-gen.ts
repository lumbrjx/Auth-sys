// 2FA Code generator
export function generateRandom6DigitNumber(): string {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const sixDigitNumber = randomNumber.toString().padStart(6, "0");
  return sixDigitNumber;
}
