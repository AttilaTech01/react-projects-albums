import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setIsError] = useState(null);
    const dispatch = useDispatch();

    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg))
            .unwrap()
            .catch((err) => {
                setIsError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch, thunk]);

    return [runThunk, isLoading, error];
}