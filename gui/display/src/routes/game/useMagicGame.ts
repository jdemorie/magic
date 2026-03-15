import {useNavigate} from "react-router";
import {useCallback, useMemo} from "react";
import {
    usePlayerOneName,
    usePlayerOneSelectedCardIndex,
    usePlayerTwoName,
    usePlayerTwoSelectedCardIndex,
    useSetPlayerOneSelectedCardIndex,
    useSetPlayerTwoSelectedCardIndex
} from "../../store/magicSlice";
import {useGetActivePlayerQuery, usePlayCardMutation, useSetActivePlayerMutation} from "../../openapi/enhancedApi";

export const useMagicGame = () => {
    const navigate = useNavigate();
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const playerOneSelectedCardIndex = usePlayerOneSelectedCardIndex();
    const playerTwoSelectedCardIndex = usePlayerTwoSelectedCardIndex();
    const setPlayerOneSelectedCardIndex = useSetPlayerOneSelectedCardIndex();
    const setPlayerTwoSelectedCardIndex = useSetPlayerTwoSelectedCardIndex();
    const activePlayer = useGetActivePlayerQuery();
    const [setActivePlayer] = useSetActivePlayerMutation();
    const [playCard] = usePlayCardMutation();

    const onBackButtonClick = useCallback(() => {
        navigate("/magic");
    }, [navigate]);

    const onPlayerOnePlay = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        if (playerOneSelectedCardIndex !== undefined) {
            playCard({
                playerName: playerOneName,
                cardIndex: playerOneSelectedCardIndex
            }).unwrap().then((res) => {
                successCallback();
            }).catch((reason) => {
                const {message} = reason.data;
                errorCallback(message || "Failed to play card");
            })
            setPlayerOneSelectedCardIndex(undefined);
        }
    }, [playerOneName, playCard, playerOneSelectedCardIndex, setPlayerOneSelectedCardIndex]);

    const onPlayerOnePassed = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        setActivePlayer({
            playerActiveBean: {
                name: playerTwoName
            }
        }).unwrap().then((res) => {
            successCallback();
        }).catch((reason) => {
            const {message} = reason.data;
            errorCallback(message || "Failed to pass the turn");
        })
    }, [setActivePlayer, playerTwoName]);

    const onPlayerTwoPlay = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        if (playerTwoSelectedCardIndex !== undefined) {
            playCard({
                playerName: playerTwoName,
                cardIndex: playerTwoSelectedCardIndex
            }).unwrap().then((res) => {
                successCallback();
            }).catch((reason) => {
                const {message} = reason.data;
                errorCallback(message || "Failed to play card");
            })
            setPlayerTwoSelectedCardIndex(undefined);
        }
    }, [playerTwoName, playCard, playerTwoSelectedCardIndex, setPlayerTwoSelectedCardIndex]);

    const onPlayerTwoPassed = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        setActivePlayer({
            playerActiveBean: {
                name: playerOneName
            }
        }).unwrap().then((res) => {
            successCallback();
        }).catch((reason) => {
            const {message} = reason.data;
            errorCallback(message || "Failed to pass the turn");
        })
    }, [setActivePlayer, playerOneName]);

    const disabledPlayButtonForPlayerOne = useMemo(() => {
        return activePlayer.data?.name !== playerOneName
    }, [activePlayer, playerOneName]);
    
    const disabledPlayButtonForPlayerTwo = useMemo(() => {
        return activePlayer.data?.name !== playerTwoName
    }, [activePlayer, playerTwoName]);

    return {
        onBackButtonClick,
        onPlayerOnePlay,
        onPlayerTwoPlay,
        onPlayerOnePassed,
        onPlayerTwoPassed,
        disabledPlayButtonForPlayerOne,
        disabledPlayButtonForPlayerTwo
    }
}