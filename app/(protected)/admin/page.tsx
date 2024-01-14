"use client";

import { logout } from "@/actions/logout";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useEffect } from "react";

const AdminPage = () => {
    const role = useCurrentRole();

    useEffect(() => {
        if (role !== "ADMIN") {
            logout();
        }
    }, []);

    return (
        <div>
            <h1>Admin</h1>
            <UserButton />
        </div>
    );
}

export default AdminPage;