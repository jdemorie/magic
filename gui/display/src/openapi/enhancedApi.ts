import {projectApi} from "./api";

type TagTypes =
    | "getPlayerHealthAndMana"
    | "getActivePlayer"
    | "getPlayerCards";

export const enhancedApi = projectApi.enhanceEndpoints<
    TagTypes
>({
    addTagTypes: [
        "getPlayerHealthAndMana",
        "getPlayerCards",
        "getActivePlayer"
    ],
    endpoints: {
        startGame: {
            invalidatesTags: (_, __, req) => [
                {
                    type: "getPlayerCards",
                },
                {
                    type: "getActivePlayer",
                },
                {
                    type: "getPlayerHealthAndMana",
                },
            ],
        },
        getPlayerHealthAndMana: {
            providesTags: (_, __, req) => [
                {
                    type: "getPlayerHealthAndMana",
                },
            ],
        },
        playCard: {
            invalidatesTags: (_, __, req) => [
                {
                    type: "getPlayerHealthAndMana",
                },
                {
                    type: "getPlayerCards",
                    id: req.playerName
                },
            ],
        },
        getActivePlayer: {
            providesTags: (_, __, req) => [
                {
                    type: "getActivePlayer",
                },
            ],
        },
        setActivePlayer: {
            invalidatesTags: (_, __, req) => [
                {
                    type: "getActivePlayer",
                },
                {
                    type: "getPlayerHealthAndMana",
                },
                {
                    type: "getPlayerCards",
                    id: req.playerActiveBean.name
                },
            ],
        },
        getPlayerCards: {
            providesTags: (_, __, req) => [
                {
                    type: "getPlayerCards",
                    id: req.playerName
                },
            ],
        },
    },
});

export const {
    useStartGameMutation,
    useGetPlayerHealthAndManaQuery,
    usePlayCardMutation,
    useGetActivePlayerQuery,
    useSetActivePlayerMutation,
    useGetPlayerCardsQuery,
} = enhancedApi;