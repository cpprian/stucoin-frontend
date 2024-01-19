"use client"

import { useCurrentRole } from "@/hooks/use-current-role"

const HomePage = () => {
    const role = useCurrentRole();

    return (
        <div>
            <h1>Home</h1>
            <h3>You are {role}</h3>
            {/* TODO: list of tasks or list of my task as a teacher */}
        </div>
    )
}

export default HomePage