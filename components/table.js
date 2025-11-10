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

function sanitizeLastNameLive(value) {
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
  return out;
}

function sanitizeLastNameFinalize(value) {
  // Trim and ensure single word letters-only
  const live = sanitizeLastNameLive(value);
  return live.trim();
}

function sanitizeUsernameLive(value) {
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
  return out;
}

function sanitizeUsernameFinalize(value) {
  // Digits only, no spaces or special characters
  return sanitizeUsernameLive(value);
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
              lastName: sanitizeLastNameLive(e.target.value),
            })
          }
          onBlur={() => {
            const cleaned = sanitizeLastNameFinalize(localUser.lastName);
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
              username: sanitizeUsernameLive(e.target.value),
            })
          }
          onBlur={() => {
            const cleaned = sanitizeUsernameFinalize(localUser.username);
            if (cleaned !== localUser.username) {
              setLocalUser({ ...localUser, username: cleaned });
            }
            handleBlur("username");
          }}
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
                lastName: sanitizeLastNameLive(e.target.value),
              })
            }
            onBlur={() => {
              const cleaned = sanitizeLastNameFinalize(form.lastName);
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
                username: sanitizeUsernameLive(e.target.value),
              })
            }
            onBlur={() => {
              const cleaned = sanitizeUsernameFinalize(form.username);
              if (cleaned !== form.username) {
                setForm({ ...form, username: cleaned });
              }
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
            <Check color="green" />
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
