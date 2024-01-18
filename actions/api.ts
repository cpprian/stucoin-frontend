const API_BASE_URL = "http://localhost:8000";

export const fetchData = async (path: string, method: string, body: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
};