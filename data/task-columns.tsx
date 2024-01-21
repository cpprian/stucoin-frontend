import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TitleCell } from "@/components/title-cell";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { renderDescriptionCell } from "@/lib/renderDescriptionCell";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type Task = {
    Title: string;
    Points: number;
    Completed: "COMPLETED" | "INCOMPLETED" | "ABORTED" | "ACCEPTED" | "OPEN";
    ID: string;
    Description: string;
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
        accessorKey: "Description",
        header: "Description",
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                {renderDescriptionCell(row.original.Description)}
            </div>
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
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <Badge
                    variant="outline"
                    color={
                        row.original.Completed === "COMPLETED" || row.original.Completed === "OPEN" ? "green" :
                            row.original.Completed === "ABORTED" ? "red" : row.original.Completed === "ACCEPTED" ? "blue" :
                                "orange"
                    }
                >
                    {row.original.Completed}
                </Badge>
            </div>
        ),
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
];

