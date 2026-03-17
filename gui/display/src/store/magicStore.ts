import {configureStore} from "@reduxjs/toolkit";
import {magicSlice} from "./magicSlice";
import {projectApi} from '../openapi/api';
import {notificationSlice} from "./notificationSlice";

export const magicStore = configureStore({
    reducer: {
        magic: magicSlice.reducer,
        notification: notificationSlice.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectApi.middleware),
});
