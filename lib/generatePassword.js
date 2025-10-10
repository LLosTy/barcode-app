import next from "next";

export default function GeneratePass() {
  // let allowedChars = [
  //   "A",
  //   "B",
  //   "C",
  //   "D",
  //   "E",
  //   "F",
  //   "G",
  //   "H",
  //   "I",
  //   "J",
  //   "K",
  //   "L",
  //   "M",
  //   "N",
  //   "O",
  //   "P",
  //   "Q",
  //   "R",
  //   "S",
  //   "T",
  //   "U",
  //   "V",
  //   "W",
  //   "X",
  //   "a",
  //   "b",
  //   "c",
  //   "d",
  //   "e",
  //   "f",
  //   "g",
  //   "h",
  //   "i",
  //   "j",
  //   "k",
  //   "l",
  //   "m",
  //   "n",
  //   "o",
  //   "p",
  //   "q",
  //   "r",
  //   "s",
  //   "t",
  //   "u",
  //   "v",
  //   "w",
  //   "x",
  //   "0",
  //   "1",
  //   "2",
  //   "3",
  //   "4",
  //   "5",
  //   "6",
  //   "7",
  //   "8",
  //   "9",
  // ]; // All characters except Y , Z , y , z
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
  ]; // All characters except Y , Z , y , z

  let passwordLength = 16;

  let numbersChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  //Ensuring that the password contains a number

  let i;
  let password = [];
  let containsNumber = false;
  for (i = 0; i < passwordLength; i++) {
    let nextChar =
      allowedChars[Math.floor(Math.random() * allowedChars.length)];
    password.push(nextChar);
    parseInt(nextChar) ? (containsNumber = true) : null;
  }
  let validPassword = [];
  //Check if number at end of sequence
  if (containsNumber == false) {
    validPassword = password[Math.floor(Math.random() * allowedChars.length)] =
      numbersChars[Math.floor(Math.random() * allowedChars.length)];
  }

  console.log("Valid password:", validPassword);
  password = password.toString().replaceAll(",", "");
  console.log("Password", password, "containsNumber:", containsNumber);
  return password;
  //   document.getElementById("passwordDisplay").innerHTML = password
  //     .toString()
  //     .replaceAll(",", "");
  //Get the password to not show ","
}
