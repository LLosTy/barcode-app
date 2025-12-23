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
import BarcodeButton from "@/components/barcode";
import { Trash, UserPlus, PencilOff, Check } from "lucide-react";

function sanitizeFirstName(value, finalize = false) {
  const input = String(value || "");
  let out = "";
  let prevSpace = false;
  let hasInsertedSpace = false;
  for (let i = 0; i < input.length; i += 1) {
    const c = input[i];
    const code = c.charCodeAt(0);
    const isLetter = (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    if (isLetter) {
      out += c;
      prevSpace = false;
    } else if (c === " " && !prevSpace && out.length > 0 && !hasInsertedSpace) {
      out += " ";
      prevSpace = true;
      hasInsertedSpace = true;
    }
  }
  if (finalize) {
    out = out.trim();
    const parts = out.split(" ").filter(Boolean).slice(0, 2);
    return parts.join(" ");
  }
  return out;
}

function sanitizeLastName(value, finalize = false) {
  const input = String(value || "");
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const c = input[i];
    const code = c.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90; // A-Z
    const isLower = code >= 97 && code <= 122; // a-z
    if (isUpper || isLower) {
      out += c;
    }
  }
  if (finalize) {
    return out.trim();
  }
  return out;
}

function sanitizeUsername(value, finalize = false) {
  const input = String(value || "");
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const c = input[i];
    const code = c.charCodeAt(0);
    const isDigit = code >= 48 && code <= 57; // 0-9
    if (isDigit) {
      out += c;
    }
  }
  if (finalize) {
    return out;
  }
  return out;
}

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
        {/* // TODO
      // Trim updated user data
      // Allowed characters only a-z A-Z and " " */}
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 
                     dark:focus-visible:bg-input/30 border-transparent bg-transparent 
                     text-right shadow-none focus-visible:border dark:bg-transparent"
          value={localUser.firstName}
          onChange={(e) =>
            setLocalUser({
              ...localUser,
              firstName: sanitizeFirstName(e.target.value, false),
            })
          }
          onBlur={() => {
            const cleaned = sanitizeFirstName(localUser.firstName, true);
            if (cleaned !== localUser.firstName) {
              setLocalUser({ ...localUser, firstName: cleaned });
            }
            handleBlur("firstName");
          }}
        />
      </TableCell>
      <TableCell>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 
                     dark:focus-visible:bg-input/30 border-transparent bg-transparent 
                     text-right shadow-none focus-visible:border dark:bg-transparent"
          value={localUser.lastName}
          onChange={(e) =>
            setLocalUser({
              ...localUser,
              lastName: sanitizeLastName(e.target.value, false),
            })
          }
          onBlur={() => {
            const cleaned = sanitizeLastName(localUser.lastName, true);
            if (cleaned !== localUser.lastName) {
              setLocalUser({ ...localUser, lastName: cleaned });
            }
            handleBlur("lastName");
          }}
        />
      </TableCell>
      <TableCell>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 
                     dark:focus-visible:bg-input/30 border-transparent bg-transparent 
                     text-right shadow-none focus-visible:border dark:bg-transparent"
          value={localUser.username}
          onChange={(e) =>
            setLocalUser({
              ...localUser,
              username: sanitizeUsername(e.target.value, false),
            })
          }
          onBlur={() => {
            const cleaned = sanitizeUsername(localUser.username, true);
            if (cleaned !== localUser.username) {
              setLocalUser({ ...localUser, username: cleaned });
            }
            handleBlur("username");
          }}
        />
      </TableCell>
      <TableCell className="w-[200px]">{user.password}</TableCell>
      <TableCell className="text-right w-[200px]">NewPassword123*</TableCell>
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

  const resetForm = useCallback(
    () =>
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        id: crypto.randomUUID(),
      }),
    []
  );

  // stable handler references
  const handleModifyUser = useCallback(onModifyUser, [onModifyUser]);
  const handleDeleteUser = useCallback(onDeleteUser, [onDeleteUser]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-7xl">
      <div className="flex items-center justify-end gap-3 min-h-[56px]">
        {isAddingUserForm && (
          <div className="flex flex-nowrap items-center gap-2">
            <Input
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({
                  ...form,
                  firstName: sanitizeFirstName(e.target.value, false),
                })
              }
              onBlur={() => {
                const cleaned = sanitizeFirstName(form.firstName, true);
                if (cleaned !== form.firstName) {
                  setForm({ ...form, firstName: cleaned });
                }
              }}
            />
            <Input
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({
                  ...form,
                  lastName: sanitizeLastName(e.target.value, false),
                })
              }
              onBlur={() => {
                const cleaned = sanitizeLastName(form.lastName, true);
                if (cleaned !== form.lastName) {
                  setForm({ ...form, lastName: cleaned });
                }
              }}
            />
            <Input
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: sanitizeUsername(e.target.value, false),
                })
              }
              onBlur={() => {
                const cleaned = sanitizeUsername(form.username, true);
                if (cleaned !== form.username) {
                  setForm({ ...form, username: cleaned });
                }
              }}
            />
            <Button
              onClick={() => {
                onAddUser(form);
                resetForm();
              }}
            >
              <Check />
            </Button>
          </div>
        )}

        <Button
          className="cursor-pointer"
          onClick={() =>
            setIsAddingUserForm((prev) => {
              if (prev) {
                resetForm();
              }
              return !prev;
            })
          }
        >
          {isAddingUserForm ? <PencilOff /> : <UserPlus />}
        </Button>

        <BarcodeButton users={users} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="w-[200px]">Password</TableHead>
            <TableHead className="text-right w-[200px]">
              Temporary password
            </TableHead>
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
    </div>
  );
}
