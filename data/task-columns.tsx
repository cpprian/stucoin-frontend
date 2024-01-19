import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { getUserById } from "./user";
import { useEffect } from "react";
import { OwnerCell } from "@/components/owner-cell";
import { useRouter } from "next/navigation";
import { TitleCell } from "@/components/title-cell";

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
                onCheckedChange={(value: any) => { row.toggleSelected(!!value); console.log(row.original.ID) }}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "Title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            TitleCell(row.original.Title, row.original.ID)
        ),
    },
    {
        header: "Description",
        accessorKey: "Description",
        cell: ({ row }) => (
          <div className="capitalize">
            {row.original.Description.length > 50
              ? `${row.original.Description.substring(0, 50)}...`
              : row.original.Description
            }
          </div>
        ),
      },
    {
        header: "Completed",
        accessorKey: "Completed",
    },
    {
        header: "Points",
        accessorKey: "Points",
    },
    {
                accessorKey: "Owner",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                OwnerCell(row.original.Owner)
            )
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.ID)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];