"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Task } from "@/schemas/task";
import { fetchData } from "@/actions/api";
import { useEdgeStore } from '@/lib/edgestore';
import { FileState, MultiFileDropzone, formatFileSize } from "@/components/multi-file-dropzone";
import { FileIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCoverImage } from "@/hooks/use-cover-image";

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
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();
    const router = useRouter();
    const coverImage = useCoverImage();
    const [updateDataFlag, setUpdateDataFlag] = useState(false);

    const onChange = (content: string) => {
        fetchData(`/tasks/content/${params.taskId}`, "PUT", {
            content: content,
        });
    }

    const addFile = (body: object) => {
        fetchData(`/tasks/files/${params.taskId}`, "POST", body);
    }

    const deleteFile = (body: object) => {
        fetchData(`/tasks/files/${params.taskId}`, "DELETE", body)
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
    }, [updateDataFlag, coverImage.url]);

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

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
                <Toolbar initialData={data} onChange={setUpdateDataFlag} />
                <Editor
                    onChange={onChange}
                    initialContent={data.Description}
                />
                <div className="space-y-4 pl-8 pt-4">
                    <h2 className="text-3xl font-bold">
                        Resources
                    </h2>
                    <MultiFileDropzone
                        value={fileStates}
                        onChange={(files) => {
                            setFileStates(files);
                        }}
                        onFilesAdded={async (addedFiles) => {
                            setFileStates([...fileStates, ...addedFiles]);
                            await Promise.all(
                                addedFiles.map(async (addedFileState) => {
                                    try {
                                        const res = await edgestore.publicFiles.upload({
                                            file: addedFileState.file,
                                            onProgressChange: async (progress) => {
                                                updateFileProgress(addedFileState.key, progress);
                                                if (progress === 100) {
                                                    // wait 1 second to set it to complete
                                                    // so that the user can see the progress bar at 100%
                                                    await new Promise((resolve) => setTimeout(resolve, 1000));
                                                    updateFileProgress(addedFileState.key, 'COMPLETE');
                                                }
                                            },
                                        });
                                        addFile({
                                            path: res.url,
                                            name: addedFileState.file.name,
                                            size: addedFileState.file.size,
                                        });
                                        setUpdateDataFlag(!updateDataFlag);
                                    } catch (err) {
                                        updateFileProgress(addedFileState.key, 'ERROR');
                                    }
                                }),
                            );
                        }}
                    />
                </div>
                <div className="p-10">
                    {data.Files?.map((file) => (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-white py-1">
                            <Button
                                onClick={() => {
                                    router.push(file.Path);
                                }}
                            >
                                <FileIcon size="30" className="shrink-0" />
                            </Button>
                            <div className="min-w-0 text-sm">
                                <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {file.Name}
                                </div>
                                <div className="text-xs text-gray-400 dark:text-gray-400">
                                    {formatFileSize(file.Size)}
                                </div>
                            </div>
                            <div className="grow" />
                            <div className="flex w-12 justify-end text-xs">
                                <Button
                                    onClick={() => {
                                        deleteFile({
                                            path: file.Path,
                                            name: file.Name,
                                            size: file.Size,
                                        })

                                        // delete from array
                                        const index = data.Files?.findIndex((f) => f.Path === file.Path);
                                        console.log(index);
                                        if (index !== undefined && index !== -1 && data.Files) {
                                            data.Files.splice(index, 1);
                                            setUpdateDataFlag(!updateDataFlag);
                                        }
                                    }}
                                >
                                    <Trash2Icon className="shrink-0 dark:text-gray-400" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskIdPage;