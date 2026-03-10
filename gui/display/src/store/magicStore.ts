import {configureStore} from "@reduxjs/toolkit";

export const magicStore = configureStore({
    reducer: {
        // Add your reducers here
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});
