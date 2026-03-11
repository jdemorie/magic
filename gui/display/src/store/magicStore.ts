import {configureStore} from "@reduxjs/toolkit";
import {magicSlice} from "./magicSlice";

export const magicStore = configureStore({
    reducer: {
        magic: magicSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});
