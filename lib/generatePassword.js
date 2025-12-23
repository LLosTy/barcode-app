export default function GeneratePass() {
  const allowedChars = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
  ]; // All characters except Y , Z , y , z

  const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const passwordLength = 16;

  const password = [];
  let containsNumber = false;

  for (let i = 0; i < passwordLength; i += 1) {
    const nextChar =
      allowedChars[Math.floor(Math.random() * allowedChars.length)];
    password.push(nextChar);
    if (/\d/.test(nextChar)) {
      containsNumber = true;
    }
  }

  if (!containsNumber) {
    password[Math.floor(Math.random() * password.length)] =
      numberChars[Math.floor(Math.random() * numberChars.length)];
  }

  return password.join("");
}
