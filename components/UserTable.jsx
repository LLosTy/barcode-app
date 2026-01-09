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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarcodeButton } from "@/components/Barcode";
import { CopyablePassword } from "@/components/CopyablePassword";
import { Sheet, Trash, UserPlus } from "lucide-react";
import removeAccents from "remove-accents";

const TEMP_PASSWORD = "NewPassword123*";

function escapeCsvValue(value) {
  const str = String(value ?? "");
  if (str.includes('"') || str.includes(",") || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildCsv(users) {
  const headers = [
    "First Name",
    "Last Name",
    "Username",
    "Password",
    "Temporary password",
  ];
  const rows = users.map((u) =>
    [
      escapeCsvValue(u.firstName),
      escapeCsvValue(u.lastName),
      escapeCsvValue(u.username),
      escapeCsvValue(u.password),
      escapeCsvValue(TEMP_PASSWORD),
    ].join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function sanitizeFirstName(value, finalize = false) {
  const input = removeAccents(String(value || ""));
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

    // Capitalize first letter of each word
    const capitalized = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );

    return capitalized.join(" ");
  }

  return out;
}

function sanitizeLastName(value, finalize = false) {
  const input = removeAccents(String(value || ""));
  let out = "";

  for (let i = 0; i < input.length; i += 1) {
    const c = input[i];
    const code = c.charCodeAt(0);
    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;

    if (isUpper || isLower) {
      out += c;
    }
  }

  if (finalize) {
    out = out.trim();

    // Capitalize first letter and first letter after hyphens or spaces
    if (out.length > 0) {
      const separators = /[\s\-]/;
      const parts = out.split(separators);
      const separatorsArray = out.match(separators) || [];

      let result =
        parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();

      for (let i = 1; i < parts.length; i++) {
        if (parts[i].length > 0) {
          result +=
            separatorsArray[i - 1] +
            parts[i].charAt(0).toUpperCase() +
            parts[i].slice(1).toLowerCase();
        }
      }

      return result;
    }

    return out;
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
      <TableCell className="w-[200px]">
        <CopyablePassword password={user.password} />
      </TableCell>
      <TableCell className="text-right w-[200px]">
        <CopyablePassword password={TEMP_PASSWORD} />
      </TableCell>
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

export function UserTable({ users, onAddUser, onModifyUser, onDeleteUser }) {
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
  const handleDownloadCsv = useCallback(() => {
    const csv = buildCsv(users);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    link.click();
    URL.revokeObjectURL(url);
  }, [users]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-7xl">
      <div className="flex flex-wrap items-center justify-end gap-3 min-h-[56px]">
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  onAddUser(form);
                  resetForm();
                }}
              >
                <UserPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add user to table</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="cursor-pointer"
              onClick={handleDownloadCsv}
              disabled={!users.length}
            >
              <Sheet className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download CSV</TooltipContent>
        </Tooltip>

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
