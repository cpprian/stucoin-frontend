"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Button } from "@/components/ui/button";
import { AlertCircle, PlusCircle, Terminal } from "lucide-react";
import Image from "next/image";
import { useData } from "@/hooks/use-data";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchData } from "@/actions/api";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";


const TaskPage = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const role = useCurrentRole();
    const { toast } = useToast();
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
                    toast({
                        title: "Task created",
                        description: "Your task has been created successfully.",
                    });
                    router.push(`/tasks/${data.insertedID}`);
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong",
                    description: "There was an error creating a new task. Please try again later.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>
                });
            }
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: "There was an error creating a new task. Please try again later.",
                action: <ToastAction altText="Try again">Try again</ToastAction>
            });
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
                </>
            )}
        </div>
    );
}

export default TaskPage;