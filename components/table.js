import { memo, useCallback, useState, useEffect } from "react";
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
import { Trash, UserPlus, PencilOff } from "lucide-react";

const UserRow = memo(function UserRow({
  user,
  index,
  onModifyUser,
  onDeleteUser,
}) {
  const [localUser, setLocalUser] = useState(user);

  // Keep local state in sync if parent data changes externally
  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  const handleBlur = (field) => {
    // Only trigger update if value changed
    if (localUser[field] !== user[field]) {
      onModifyUser(field, index, localUser[field]);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 
                     dark:focus-visible:bg-input/30 border-transparent bg-transparent 
                     text-right shadow-none focus-visible:border dark:bg-transparent"
          value={localUser.firstName}
          onChange={(e) =>
            setLocalUser({ ...localUser, firstName: e.target.value })
          }
          onBlur={() => handleBlur("firstName")}
        />
      </TableCell>
      <TableCell>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 
                     dark:focus-visible:bg-input/30 border-transparent bg-transparent 
                     text-right shadow-none focus-visible:border dark:bg-transparent"
          value={localUser.lastName}
          onChange={(e) =>
            setLocalUser({ ...localUser, lastName: e.target.value })
          }
          onBlur={() => handleBlur("lastName")}
        />
      </TableCell>
      <TableCell>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 
                     dark:focus-visible:bg-input/30 border-transparent bg-transparent 
                     text-right shadow-none focus-visible:border dark:bg-transparent"
          value={localUser.username}
          onChange={(e) =>
            setLocalUser({ ...localUser, username: e.target.value })
          }
          onBlur={() => handleBlur("username")}
        />
      </TableCell>
      <TableCell>{user.password}</TableCell>
      <TableCell className="text-right">NewPassword123*</TableCell>
      <TableCell className="p-0">
        <Button
          className="bg-transparent border-transparent shadow-none hover:bg-input/30 cursor-pointer"
          onClick={() => onDeleteUser(index)}
        >
          <Trash color="red" />
        </Button>
      </TableCell>
    </TableRow>
  );
});

export function TableDemo({ users, onAddUser, onModifyUser, onDeleteUser }) {
  const [isAddingUserForm, setIsAddingUserForm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    id: crypto.randomUUID(),
  });

  // stable handler references
  const handleModifyUser = useCallback(onModifyUser, [onModifyUser]);
  const handleDeleteUser = useCallback(onDeleteUser, [onDeleteUser]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-7xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead className="text-right">Temporary password</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <UserRow
              key={user.id}
              user={user}
              index={index}
              onModifyUser={handleModifyUser}
              onDeleteUser={handleDeleteUser}
            />
          ))}
        </TableBody>
      </Table>

      {isAddingUserForm && (
        <div className="flex flex-row gap-4">
          <Input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
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
      )}

      <Button
        className="cursor-pointer"
        onClick={() => setIsAddingUserForm((prev) => !prev)}
      >
        {isAddingUserForm ? <PencilOff /> : <UserPlus />}
      </Button>
    </div>
  );
}
