"use client"

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "../ui/button";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export const Logo = () => {
    const router = useRouter();

    const onClick = () => { 
        router.push("/");
    };

    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Button
                onClick={onClick} 
                variant="ghost"
                className={cn("font-semibold", font.className, "text-xl")}
            >
                📐Stucoin
            </Button>
        </div>
    );
};