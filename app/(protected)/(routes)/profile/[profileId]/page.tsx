"use client"

import { fetcher } from "@/lib/fetcher";
import { User } from "next-auth";
import { useQuery } from "@tanstack/react-query";

interface ProfilePageProps {
    params: {
        profileId: string;
    }
};

const ProfilePage = ({
    params
}: ProfilePageProps) => {
    const { data: User } = useQuery<User>({
        queryKey: ["profile", params.profileId],
        queryFn: () => fetcher(`/api/profile/${params.profileId}`),
    })

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             console.log("fetching user");
    //             const response = await fetcher(`/api/profile/${params.profileId}`);

    //             if (!response.ok) {
    //                 throw new Error("Response not okay");
    //             }

    //             console.log("response is okay", response);
    //             // response.json().then((data) => {
    //             //     console.log("lol " + data)
    //             //     setUser(data);
    //             // });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchUser();
    // }, [params.profileId]);

    return (
        <div>
            <h1>Profile page</h1>
            <h2>{User?.email}</h2>
            <h2>{User?.name}</h2>
        </div>
    )
};

export default ProfilePage;