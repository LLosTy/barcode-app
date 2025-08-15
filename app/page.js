import Barcode from "@/components/barcode";
import { TableDemo } from "@/components/table";
import GeneratePass from "@/lib/generatePassword";

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

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    username: "john.doe",
    password: "123456",
    passwordTemporary: "123456",
  },
];

users.map((user) => {
  user.password = GeneratePass();
});

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
      <TableDemo users={users} />
      <div>
        {users.map((user) => (
          <Barcode key={user.username} user={user} />
        ))}
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
