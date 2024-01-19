import { useEffect, useState } from "react";
import { fetchData } from "@/actions/api";

export const useData = (path: string, method: string, body: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDataFromApi = async () => {
            setLoading(true);
            
            try {
                const result = await fetchData(path, method, body);
                setData(result);
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataFromApi();
    }, [path, method, body]);

    return { data, error, loading };
}