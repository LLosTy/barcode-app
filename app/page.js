"use client";
import Barcode from "@/components/barcode";
import { TableDemo } from "@/components/table";
import GeneratePass from "@/lib/generatePassword";
import { useState } from "react";

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
      firstName: "Barbara",
      lastName: "Hepworth",
      username: "41341879413",
    },
  ]);

  users.map((user) => {
    user.password = GeneratePass();
  });

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    // <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
    // <TableDemo users={users} />
    // <div>

    <div className="font-sans grid grid-rows items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2"></main>
      <TableDemo users={users} onAddUser={addUser} />
      <Barcode users={users} />
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
