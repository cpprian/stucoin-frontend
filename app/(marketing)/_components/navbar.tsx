"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6">
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-4">
                {!isAuthenticated && !isLoading && (
                    <SignInButton mode="modal">
                        <Button variant="outline" size="sm">
                            Log in
                        </Button>
                    </SignInButton>
                )}
                {isAuthenticated && !isLoading && redirect("/documents")}
                <ModeToggle />
            </div>
        </div>
    );
};