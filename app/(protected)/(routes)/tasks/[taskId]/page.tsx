"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Task } from "@/schemas/task";
import { fetchData } from "@/actions/api";

interface TaskIdPageProps {
    params: {
        taskId: string;
    };
};


const TaskIdPage = ({
    params
}: TaskIdPageProps) => {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);
    const [data, setData] = useState<Task | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const onChange = (content: string) => {
        fetchData(`/tasks/content/${params.taskId}`, "PUT", {
            content: content,
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData(`/tasks/${params.taskId}`, "GET", {});
                data?.json().then((data) => {
                    console.log(data)
                    setData(data);
                });
                setError(error);
            } catch (e: any) {
                console.error(e);
                setError(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (data === undefined || loading) {
        return (
            <div>
                <Cover.Skeleton />
                <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                    <div className="space-y-4 pl-8 pt-4">
                        <Skeleton className="h-14 w-[50%]" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[40%]" />
                        <Skeleton className="h-4 w-[60%]" />
                    </div>
                </div>
            </div>
        );
    }

    if (data === null) {
        return (
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className="space-y-4 pl-8 pt-4">
                    <h1 className="text-3xl font-bold">404</h1>
                    <h2 className="text-xl font-bold">Task not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-40">
            <Cover url={data.CoverImage} data={data} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={data} />
                <Editor
                    onChange={onChange}
                    initialContent={data.Description}
                />
            </div>
        </div>
    );
}

export default TaskIdPage;