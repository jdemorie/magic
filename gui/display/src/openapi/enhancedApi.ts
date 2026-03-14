import {projectApi} from "./api";

type TagTypes =
    | "getGameInformation"
    | "getPlayerCard";

export const enhancedApi = projectApi.enhanceEndpoints<
    TagTypes
>({
    addTagTypes: [
        "getGameInformation",
        "getPlayerCard",
    ],
    endpoints: {
        getGameInformation: {
            providesTags: (_, __, req) => [
                {
                    type: "getGameInformation",
                },
            ],
        },
        startGame: {
            invalidatesTags: (_, __, req) => [
                {
                    type: "getGameInformation",
                },
            ],
        },
        getPlayerCard: {
            providesTags: (_, __, req) => [
                {
                    type: "getPlayerCard",
                },
            ],
        },
    },
});

export const {
    useGetGameInformationQuery,
    useStartGameMutation,
    useGetPlayerCardQuery
} = enhancedApi;