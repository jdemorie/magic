import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

//TODO in progress to manage notifications in the app, currently only for magic game, but can be used in other places as well

interface NotificationState {
    message: string;
    type: "info" | "error" | "success" | "warning";
}

const initialState: NotificationState = {
    message: "",
    type: "info",
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
    useSelector((state: { notification: NotificationState }) => state.notification);

export const useSetNotification = () => {
    const dispatch = useDispatch();
    return useCallback((message: string, type: "info" | "error" | "success" | "warning") => {
        dispatch(setNotification({message, type}));
    }, [dispatch]);
}

export const {
    setNotification,
} = notificationSlice.actions;