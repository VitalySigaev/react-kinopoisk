import { useState } from "react";


type CallbackType = (...args: any[]) => Promise<any>;
type FetchingType = [CallbackType, boolean, string];


export const useFetching = (callback: CallbackType): FetchingType => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching: CallbackType = async (...args: any[]): Promise<any> => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};
