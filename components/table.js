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

export function TableDemo({ users }) {
  return (
    <Table>
      {/* <TableCaption>A list of users.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Password</TableHead>
          <TableHead className="text-right">Password temporary</TableHead>
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
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
