"use client";
import { TableDemo } from "@/components/table";
import GeneratePass from "@/lib/generatePassword";
import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    console.log("new user added");
    newUser = {
      ...newUser,
      password: GeneratePass(),
    };
    setUsers([...users, newUser]);
  };

  const modifyUser = (property, index, change) => {
    let updatedArr = users;
    updatedArr[index][`${property}`] = change;
    setUsers([...updatedArr]);
  };

  const deleteUser = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    // <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
    // <TableDemo users={users} />
    // <div>

    <div className="font-sans grid grid-rows items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            User Barcode PDF Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate user credentials barcodes
          </p>
        </div>

        <TableDemo
          users={users}
          onAddUser={addUser}
          onModifyUser={modifyUser}
          onDeleteUser={deleteUser}
        />
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
      </div>
    </div>
  );
}
