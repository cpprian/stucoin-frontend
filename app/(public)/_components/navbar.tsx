"use client"

import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "../../../components/marketing/logo";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    return (
        <div className="z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6">
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-4">
                <LoginButton asChild>
                    <Button variant="outline">
                        Sign In
                    </Button>
                </LoginButton>
                <ModeToggle />
            </div>
        </div>
    );
};