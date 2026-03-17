import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

export const notificationName = "notification";

export enum NotificationType {
    Info = "info",
    Error = "error",
    Success = "success",
    Warning = "warning",
}

interface NotificationState {
    message?: string;
    type?: NotificationType;
}

const initialState: NotificationState = {
    message: undefined,
    type: undefined,
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
    },
})


export const useNotification = () =>
    useSelector((state: { [notificationName]: NotificationState }) => state[notificationName]);

export const useSetNotification = () => {
    const dispatch = useDispatch();
    return useCallback((message?: string, type?: NotificationType) => {
        dispatch(setNotification({message, type}));
    }, [dispatch]);
}

export const {
    setNotification,
} = notificationSlice.actions;