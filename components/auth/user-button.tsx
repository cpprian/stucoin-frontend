"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { ChevronsLeftRight, SettingsIcon, Wallet } from "lucide-react";

export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.name}
                        </span>
                    </div>
                    <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80 z-[9999999999]"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.email}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.name}
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    asChild
                    className="w-full cursor-pointer text-muted-foreground"
                >
                    <LogoutButton>
                        <div className="flex items-center my-1 gap-x-2">
                            <Wallet className="h-4 w-4 mr-2" />
                            Wallet
                        </div>
                    </LogoutButton>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    asChild
                    className="w-full cursor-pointer text-muted-foreground"
                >
                    <LogoutButton>
                        <div className="flex items-center my-1 gap-x-2">
                            <ExitIcon className="h-4 w-4 mr-2" />
                            Logout
                        </div>
                    </LogoutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};