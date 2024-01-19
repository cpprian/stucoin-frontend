import { TaskSchemaId } from "@/schemas/task";


export const convertTaskData = (rawData: object) => {
    try {
        console.log("rawData", rawData);
        const validatedData = TaskSchemaId.parse(rawData);
        return validatedData;
    } catch (error) {
        console.log('Invalid data format', error);
        throw new Error('Invalid data format');
    }
};

export const convertTaskList = (rawList: object[]) => {
    try {
        const convertedList = rawList.map((rawData) => convertTaskData(rawData));
        return convertedList;
    } catch (error) {
        console.log('Invalid data format');
        return [];
    }
};