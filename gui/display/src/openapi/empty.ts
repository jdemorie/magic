import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const serviceUrl = "http://localhost:8080";

// initialize an empty api service that we'll inject endpoints into later as needed
export const projectApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: serviceUrl,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        fetchFn: async (input, init) => {
            return await fetch(input, {
                ...init,
            });
        },
    }),
    endpoints: () => ({}),
})