"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type Task = {
    Title: string;
    Description: string;
    Points: number;
    Completed: "COMPLETED" | "INCOMPLETED" | "ABORTED" | "ACCEPTED";
    Owner: string;
    Tags: string[];
    ID: string;
    CoverImage?: string | undefined;
    InCharge?: string | undefined;
    Files?: string[] | undefined;
    Images?: string[] | undefined;
};

export const taskColumns: ColumnDef<Task>[] = [
    {
        id: "ID",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => {row.toggleSelected(!!value); console.log(row.original.ID)}}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: "Title",
        accessorKey: "Title",
    },
    {
        header: "Description",
        accessorKey: "Description",
    },
    {
        header: "Completed",
        accessorKey: "Completed",
    },
    {
        header: "Owner",
        accessorKey: "Owner",
    }
];

// export const columns = [

//   {
//     accessorKey: "Title",
//     header: "Title",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.original.Title}</div>
//     ),
//   },
//   {
//     accessorKey: "Owner",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.original.Owner}</div>,
//   },
//   {
//     accessorKey: "Points",
//     header: () => <div className="text-right">Points</div>,
//     cell: ({ row }) => {
//       return <div className="text-right font-medium">{row.original.Points}</div>
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.ID)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ];