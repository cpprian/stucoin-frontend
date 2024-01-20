"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton"
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { fetchData } from "@/actions/api";
import { Task } from "@/schemas/task";
import { User } from "next-auth";

interface CoverImageProps {
    url?: string;
    data: Task;
    preview?: boolean;
    contributors?: { owner: string, inCharge: string};
}

export const Cover = ({
    url,
    data, 
    preview,
    contributors,
}: CoverImageProps) => {
    const { edgestore } = useEdgeStore();
    const params = useParams();
    const coverImage = useCoverImage();

    const removeCoverImage = async () => {
        if (url) {
            await edgestore.publicFiles.delete({
                url: url
            });
        }
        fetchData(`/tasks/cover/${params.taskId}`, "PUT", {
            coverImage: ""
        });

        data.CoverImage = "";
    };

    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Cover"
                    className="object-cover"
                />
            )}
            {url && !preview && data.Owner === contributors?.owner && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={() => coverImage.onReplace(url)}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change cover
                    </Button>
                    <Button
                        onClick={removeCoverImage}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <X className="h-4 w-4 mr-2" />
                        Remove cover
                    </Button>
                </div>
            )}
        </div>
    );
}

Cover.Skeleton = function CoverSkeleton() {
    return (
        <Skeleton className="w-full h-[12vh]" />
    )
}