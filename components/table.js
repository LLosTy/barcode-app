"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function TableDemo({ users, onAddUser, onModifyUser }) {
  const [isAddingUserForm, setIsAddingUserForm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    id: crypto.randomUUID(),
  });

  function addUserForm() {
    return (
      <div className={"flex flex-row gap-4"}>
        <Input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => {
            setForm({
              ...form,
              firstName: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => {
            setForm({
              ...form,
              lastName: e.target.value,
            });
          }}
        />
        <Input
          placeholder="Username"
          value={form.username}
          onChange={(e) => {
            setForm({
              ...form,
              username: e.target.value,
            });
          }}
        />
        <Button
          variant="ghost"
          onClick={() => {
            onAddUser(form);
            setForm({
              firstName: "",
              lastName: "",
              username: "",
              id: crypto.randomUUID(),
            });
          }}
        >
          ✅
        </Button>
      </div>
    );
  }

  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className={"flex flex-col gap-4 w-full max-w-7xl"}>
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
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {editingUser == index ? (
                  <Input
                    value={user.firstName}
                    className="w-auto"
                    onChange={(event) => {
                      onModifyUser("firstName", index, event.target.value);
                    }}
                  ></Input>
                ) : (
                  user.firstName
                )}
              </TableCell>
              <TableCell>
                {editingUser == index ? (
                  <Input
                    value={user.lastName}
                    className="w-auto"
                    onChange={(event) => {
                      onModifyUser("lastName", index, event.target.value);
                    }}
                  ></Input>
                ) : (
                  user.lastName
                )}
              </TableCell>
              <TableCell>
                {editingUser == index ? (
                  <Input
                    value={user.username}
                    className="w-auto"
                    onChange={(event) => {
                      onModifyUser("username", index, event.target.value);
                    }}
                  ></Input>
                ) : (
                  user.username
                )}
              </TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell className="text-right">NewPassword123*</TableCell>
              <TableCell className="p-0">
                {/* if user is adding and not editing, show pencil icon */}
                {editingUser == null ? (
                  <Button onClick={() => setEditingUser(index)} variant="ghost">
                    ✏️
                  </Button>
                ) : (
                  <></>
                )}
                {editingUser == index ? (
                  <Button onClick={() => setEditingUser(null)} variant="ghost">
                    ❌
                  </Button>
                ) : (
                  <></>
                )}
              </TableCell>
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
