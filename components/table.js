"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function TableDemo({ users, onAddUser }) {
  const [isAddingUserForm, setIsAddingUserForm] = useState(false);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [UserName, setUserName] = useState("");
  const [form, setForm] = useState({
    firstName: "Barbara",
    lastName: "Hepworth",
    username: "41341879",
  });

  function addUserForm() {
    return (
      <div className={"flex flex-row gap-4"}>
        <Input
          value={form.firstName}
          onChange={(e) => {
            setForm({
              ...form,
              firstName: e.target.value,
            });
          }}
        />
        <Input
          value={form.lastName}
          onChange={(e) => {
            setForm({
              ...form,
              lastName: e.target.value,
            });
          }}
        />
        <Input
          value={form.username}
          onChange={(e) => {
            setForm({
              ...form,
              username: e.target.value,
            });
          }}
        />
        <Button onClick={() => onAddUser(form)}>+</Button>
      </div>
    );
  }

  const user = {
    firstName: "John",
    lastName: "Doe",
    username: "john.doe",
    password: "123456",
    passwordTemporary: "123456",
  };
  return (
    <div className={"flex flex-col gap-4 w-full max-w-5xl"}>
      <Table>
        {/* <TableCaption>A list of users.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="text-right">Temporary password </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.username}>
              <TableCell className="font-medium">{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell className="text-right">NewPassword123*</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isAddingUserForm ? addUserForm() : <div></div>}

      {/* <Button onClick={onAddUser(user)}>+</Button> */}
      {/* <Button onClick={() => onAddUser(user)}>+</Button> */}
      {isAddingUserForm ? (
        <Button onClick={() => setIsAddingUserForm(false)}>-</Button>
      ) : (
        <Button onClick={() => setIsAddingUserForm(true)}>+</Button>
      )}
    </div>
  );
}
