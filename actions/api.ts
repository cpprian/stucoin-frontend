const API_BASE_URL = "http://localhost:8000";

export const fetchData = async (path: string, method: string, body: object) => {
    try {
        if (method === "GET") {
            const response = await fetch(API_BASE_URL + path, {
                method: method,
            });

            return await response;
        }
        const response = await fetch(API_BASE_URL + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        return await response;
    } catch (error) {
        console.log("Error fetching data: ", error);
        return null;
    }
};