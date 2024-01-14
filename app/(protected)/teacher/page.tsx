import { logout } from "@/actions/logout";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useEffect } from "react";

const TeacherPage = () => {
    const role = useCurrentRole();

    if (role !== "TEACHER") {
        useEffect(() => {
            logout();
        }, []);
        return null;
    }

    return (
        <div>
            <h1>Teacher</h1>
            <UserButton />
        </div>
    );
}

export default TeacherPage;