import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TitleCell } from "@/components/title-cell";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type Task = {
    Title: string;
    Description: string;
    Points: number;
    Completed: "COMPLETED" | "INCOMPLETED" | "ABORTED" | "ACCEPTED" | "OPEN";
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
        header: ({ column }) => {
            return (
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="none">
                                Status
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="">
                            <div className="grid gap-4">
                                {["ACCEPTED", "COMPLETED", "INCOMPLETED", "ABORTED", "OPEN"].map((status) => (
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <Button 
                                                variant="none"
                                                onClick={() => column.getFilterValue() === status ? column.setFilterValue("") : column.setFilterValue(status)}
                                            >
                                             {status}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            );
        },
        accessorKey: "Completed",
    },
    {
        accessorKey: "Points",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Points
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        header: "Tags",
        accessorKey: "Tags",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.original.Tags.length > 0
                    ? `${row.original.Tags.join(", ")}`
                    : "No tags"
                }
            </div>
        ),
    }
];

