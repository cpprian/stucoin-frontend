"use client"

import { getUserById } from "@/data/user";

interface ProfilePageProps {
    params: {
        profileId: string;
    }
};

export default async function ProfilePage({
    params
}: ProfilePageProps) {
    const user = await getUserById(params.profileId);

    return (
        <div>
            <h1>Profile page</h1>
            <h2>{user?.name}</h2>
            <h2>{user?.email}</h2>
        </div>
    )
};