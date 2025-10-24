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
import { Trash, UserPlus, PencilOff, Check } from "lucide-react";

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

  return (
    <div className={"flex flex-col gap-4 w-full max-w-7xl"}>
      <Table>
        {/* <TableCaption>A list of users.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
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
                <Input
                  className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                  value={user.firstName}
                  onChange={(event) => {
                    onModifyUser("firstName", index, event.target.value);
                  }}
                ></Input>
              </TableCell>
              <TableCell>
                <Input
                  className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                  value={user.lastName}
                  onChange={(event) => {
                    onModifyUser("lastName", index, event.target.value);
                  }}
                ></Input>
              </TableCell>
              <TableCell>
                <Input
                  className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                  value={user.username}
                  onChange={(event) => {
                    onModifyUser("username", index, event.target.value);
                  }}
                ></Input>
              </TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell className="text-right">NewPassword123*</TableCell>
              <TableCell className="p-0"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isAddingUserForm ? addUserForm() : <div></div>}
      {isAddingUserForm ? (
        <Button onClick={() => setIsAddingUserForm(false)}>-</Button>
      ) : (
        <Button onClick={() => setIsAddingUserForm(true)}>+</Button>
      )}
    </div>
  );
}
