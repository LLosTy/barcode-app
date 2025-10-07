"use client";
import Barcode from "@/components/barcode";
import { TableDemo } from "@/components/table";
import GeneratePass from "@/lib/generatePassword";
import { useState, useEffect } from "react";

// const users = [
//   {
//     firstName: "John",
//     lastName: "Doe",
//     username: "john.doe",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
//   {
//     firstName: "Jane",
//     lastName: "Doe",
//     username: "jane.doe",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
//   {
//     firstName: "Jim",
//     lastName: "Beam",
//     username: "jim.beam",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
//   {
//     firstName: "Joamb",
//     lastName: "Doe",
//     username: "joamb.doe",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
//   {
//     firstName: "Jack",
//     lastName: "Doe",
//     username: "jack.doe",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
//   {
//     firstName: "Jill",
//     lastName: "Doe",
//     username: "jill.doe",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
//   {
//     firstName: "Jill",
//     lastName: "Jilly",
//     username: "jill.jilly",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
// ];

// const users = [
//   {
//     firstName: "John",
//     lastName: "Doe",
//     username: "john.doe",
//     password: "123456",
//     passwordTemporary: "123456",
//   },
// ];

export default function Home() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Barbara",
      lastName: "Hepworth",
      username: "41341879413",
      password: "Sculpt2024!",
    },
    {
      id: 2,
      firstName: "Vincent",
      lastName: "van Gogh",
      username: "78592847361",
      password: "StarryNight88",
    },
    {
      id: 3,
      firstName: "Frida",
      lastName: "Kahlo",
      username: "92847563920",
      password: "ArtPain2023",
    },
    {
      id: 4,
      firstName: "Pablo",
      lastName: "Picasso",
      username: "15673849201",
      password: "Cubism1907",
    },
    {
      id: 5,
      firstName: "Georgia",
      lastName: "O'Keeffe",
      username: "84756392847",
      password: "Desert_Bloom",
    },
    {
      id: 6,
      firstName: "Leonardo",
      lastName: "da Vinci",
      username: "36485729103",
      password: "Renaissance15",
    },
    {
      id: 7,
      firstName: "Claude",
      lastName: "Monet",
      username: "57284639184",
      password: "WaterLilies99",
    },
    {
      id: 8,
      firstName: "Jackson",
      lastName: "Pollock",
      username: "19384756203",
      password: "Drip_Paint47",
    },
    {
      id: 9,
      firstName: "Andy",
      lastName: "Warhol",
      username: "63927481056",
      password: "PopArt1960s",
    },
    {
      id: 10,
      firstName: "Yves",
      lastName: "Klein",
      username: "74629385170",
      password: "BlueMonday",
    },
    {
      id: 11,
      firstName: "Banksy",
      lastName: "Anonymous",
      username: "98765432101",
      password: "StreetArt2K",
    },
    {
      id: 12,
      firstName: "Salvador",
      lastName: "Dalí",
      username: "23847569102",
      password: "Surreal_Time",
    },
    {
      id: 13,
      firstName: "Henri",
      lastName: "Matisse",
      username: "58394726815",
      password: "Fauvism_Cut",
    },
    {
      id: 14,
      firstName: "Wassily",
      lastName: "Kandinsky",
      username: "37295847361",
      password: "Abstract_Soul",
    },
    {
      id: 15,
      firstName: "Piet",
      lastName: "Mondrian",
      username: "82947563019",
      password: "RedBlueYellow",
    },
  ]);

  const addUser = (newUser) => {
    console.log("new user added");
    newUser = {
      ...newUser,
      password: GeneratePass(),
    };
    setUsers([...users, newUser]);
  };

  const modifyUser = (property, index, change) => {
    //Treat the state array as immutable
    //create a new array with the change values and update the state as a whole

    let updatedArr = users;
    console.log(property, index, change);
    updatedArr[index][`${property}`] = change;
    setUsers([...updatedArr]);
  };

  return (
    // <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
    // <TableDemo users={users} />
    // <div>

    <div className="font-sans grid grid-rows items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2"></main>
      <TableDemo users={users} onAddUser={addUser} onModifyUser={modifyUser} />
      <Barcode users={users} />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
