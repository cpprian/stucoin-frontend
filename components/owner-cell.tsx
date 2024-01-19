import { useCurrentUser } from "@/hooks/use-current-user";

export const OwnerCell = (ownerId: string) => {
    const user = useCurrentUser();
    return (
        <div>
            {user?.email}
        </div>
    )
  };