import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const TitleCell = (title: string, id: string) => {
    const router = useRouter();
    
    return (
        <div className="capitalize">
        <Button
            variant="none"
            className="background-transparent"
            onClick={() => {

                router.push(`/tasks/${id}`);
            }}
        >
            {title}
        </Button>
    </div>
    );
}