"use client";

import { useParams } from "next/navigation";
import { MenuIcon, StepBackIcon } from "lucide-react";

import { Title } from "./title";
import { Menu } from "./menu";
import { useEffect, useState } from "react";
import { Task } from "@/schemas/task";
import { fetchData } from "@/actions/api";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

export const Navbar = ({
  isCollapsed,
  onResetWidth
}: NavbarProps) => {
  const params = useParams();

  const [data, setData] = useState<Task | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (data === null) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    )
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Button
            onClick={() => {
              window.history.back();
            }}
          >
            <StepBackIcon />
          </Button>
          <span>{data.Title}</span>
          <div className="flex items-center gap-x-2">
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  )
}