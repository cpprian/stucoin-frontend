"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";


const TaskPage = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const create = 
    const document = "";

    if (document === undefined) {
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

    return (
        <div className="pb-40">
            <Cover url={"/#"} preview={false} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor
                    onChange={() => { }}
                    initialContent={document}
                />
            </div>
        </div>
    );
}

export default TaskPage;