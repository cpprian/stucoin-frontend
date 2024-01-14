"use client";

import { logout } from "@/actions/logout";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useEffect } from "react";

const StudentPage = () => {
    const role = useCurrentRole();

    if (role !== "STUDENT") {
        useEffect(() => {
            logout();
        }, []);
        return null;
    }

    return (
        <div>
            <h1>Student</h1>
            <UserButton />
        </div>
    );
}

export default StudentPage;