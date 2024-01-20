"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { ElementRef, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { Task } from "@/schemas/task";
import { fetchData } from "@/actions/api";
import { User } from "@prisma/client";

interface ToolbarProps {
    initialData: Task;
    preview?: boolean;
    contributors?: { owner: string, inCharge: string};
};

export const Toolbar = ({
    initialData,
    preview,
    contributors,
}: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.Title);

    const update = (body: object) => {
        fetchData(`/tasks/title/${initialData.ID}`, "PUT", body);
    };

    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview || initialData.Owner !== contributors?.owner) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.Title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
        update({
            title: value,
        });
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    return (
        <div className="pl-[54px] group relative">
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.CoverImage && !preview && initialData.ID === contributors?.owner && (
                    <Button
                        onClick={coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
                >
                    {value}
                </div>
            )}
        </div>
    );
};