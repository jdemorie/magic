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
            }).then(
                (_) => {
                    successCallback();
                },
                (reason) => {
                    errorCallback(reason);
                }
            )
            setPlayerOneSelectedCardIndex(undefined);
        }
    }, [playerOneName, playCard, playerOneSelectedCardIndex, setPlayerOneSelectedCardIndex]);

    const onPlayerOnePassed = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        setActivePlayer({
            playerActiveBean: {
                name: playerTwoName
            }
        }).then(
            (_) => {
                successCallback();
            },
            (reason) => {
                errorCallback(reason);
            })
    }, [setActivePlayer, playerTwoName]);

    const onPlayerTwoPlay = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        if (playerTwoSelectedCardIndex !== undefined) {
            playCard({
                playerName: playerTwoName,
                cardIndex: playerTwoSelectedCardIndex
            }).then(
                (_) => {
                    successCallback();
                },
                (reason) => {
                    errorCallback(reason);
                }
            )
            setPlayerTwoSelectedCardIndex(undefined);
        }
    }, [playerTwoName, playCard, playerTwoSelectedCardIndex, setPlayerTwoSelectedCardIndex]);

    const onPlayerTwoPassed = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
        setActivePlayer({
            playerActiveBean: {
                name: playerTwoName
            }
        }).then(
            (_) => {
                successCallback();
            },
            (reason) => {
                errorCallback(reason);
            })
    }, [setActivePlayer, playerTwoName]);

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