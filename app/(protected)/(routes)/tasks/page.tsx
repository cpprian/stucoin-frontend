"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useData } from "@/hooks/use-data";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { Alert } from "@/components/ui/alert";
import { fetchData } from "@/actions/api";


const TaskPage = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const role = useCurrentRole();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const onCreate = async () => {
        try {
            setLoading(true);
            const task = {
                title: "Untitled",
                description: "",
                coverImage: "",
                points: 0,
                completed: "INCOMPLETED",
                owner: user?.id,
                inCharge: "",
                files: [],
                images: [],
                tags: [],
            }

            const res = await fetchData("/tasks", "POST", task);
            if (res?.status === 200) {
                res.json().then((data) => {
                    console.log("Data: ", data.insertedID);
                    router.push(`/tasks/${data.insertedID}`);
                });
            } else {
                setError(new Error("Something went wrong"));
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            {role === "TEACHER" && (
                <>
                    <Image
                        src="/empty.png"
                        height="500"
                        width="500"
                        alt="Empty"
                    />
                    <h2 className="text-lg font-medium">
                        Oh no! You don't have any tasks yet. Create one now!
                    </h2>
                    {!loading && (
                        <Button onClick={onCreate}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Create a new task
                        </Button>
                    )}
                    {loading && (
                        <Spinner size="lg" />
                    )}
                    {error && (
                        <Alert>
                            {error.message}
                        </Alert>
                    )}
                </>
            )}
        </div>
    );
}

export default TaskPage;