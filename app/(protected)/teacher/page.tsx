"use client";

import { logout } from "@/actions/logout";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useEffect } from "react";

const TeacherPage = () => {
    const role = useCurrentRole();

    useEffect(() => {
        if (role !== "TEACHER") {
            logout();
        }
    }, []);

    return (
        <div>
            <h1>Teacher</h1>
            <UserButton />
        </div>
    );
}

export default TeacherPage;