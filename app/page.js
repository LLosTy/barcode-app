"use client";
import { UserTable } from "@/components/UserTable";
import GeneratePass from "@/lib/generatePassword";
import { useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    const userWithPassword = {
      ...newUser,
      password: GeneratePass(),
    };
    setUsers((prev) => [...prev, userWithPassword]);
  };

  const modifyUser = (property, index, change) => {
    setUsers((prev) =>
      prev.map((user, i) =>
        i === index ? { ...user, [property]: change } : user
      )
    );
  };

  const deleteUser = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="font-sans grid grid-rows items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            User Barcode PDF Generator v1
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate user credentials barcodes
          </p>
        </div>

        <UserTable
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
