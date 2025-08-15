export default function GeneratePass() {
  let allowedChars = [
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
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ]; // All characters except Y , Z , y , z

  let passwordLength = 16;

  let i;
  let password = [];
  for (i = 0; i < passwordLength; i++) {
    password.push(
      allowedChars[Math.floor(Math.random() * allowedChars.length)]
    );
  }
  return password.toString().replaceAll(",", "");
  //   document.getElementById("passwordDisplay").innerHTML = password
  //     .toString()
  //     .replaceAll(",", "");
  //Get the password to not show ","
}
