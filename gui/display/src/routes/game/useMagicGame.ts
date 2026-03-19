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
import {useMessageNotification} from "../../store/useMessageNotification";
import {NotificationType} from "../../store/notificationSlice";
import {useWinnerName} from "./useWinnerName";

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
    const {setNotificationState} = useMessageNotification();
    const {winnerName, setWinnerName} = useWinnerName();

    const onBackButtonClick = useCallback(() => {
        navigate("/magic");
    }, [navigate]);

    const onPlayerOnePlay = useCallback(() => {
        if (playerOneSelectedCardIndex !== undefined) {
            playCard({
                playerName: playerOneName,
                cardIndex: playerOneSelectedCardIndex
            }).unwrap().then((_) => {
                setNotificationState("You played a card", NotificationType.Info);
            }).catch((reason) => {
                const {message, errorCode} = reason.data;
                if (errorCode === "GAME_OVER") {
                    setWinnerName(playerOneName);
                } else {
                    setNotificationState(message || "Failed to play card", NotificationType.Error);
                }
            })
            setPlayerOneSelectedCardIndex(undefined);
        }
    }, [playerOneName, playCard, playerOneSelectedCardIndex, setPlayerOneSelectedCardIndex, setNotificationState, setWinnerName]);

    const onPlayerOnePassed = useCallback(() => {
        setActivePlayer({
            playerActiveBean: {
                name: playerTwoName
            }
        }).unwrap().then((_) => {
            setNotificationState("You pass your turn", NotificationType.Info);
        }).catch((reason) => {
            const {message} = reason.data;
            setNotificationState(message || "Failed to pass your turn", NotificationType.Error);
        })
    }, [setActivePlayer, playerTwoName, setNotificationState]);

    const onPlayerTwoPlay = useCallback(() => {
        if (playerTwoSelectedCardIndex !== undefined) {
            playCard({
                playerName: playerTwoName,
                cardIndex: playerTwoSelectedCardIndex
            }).unwrap().then((_) => {
                setNotificationState("You played a card", NotificationType.Info);
            }).catch((reason) => {
                const {message, errorCode} = reason.data;
                if (errorCode === "GAME_OVER") {
                    setWinnerName(playerTwoName);
                } else {
                    setNotificationState(message || "Failed to play card", NotificationType.Error);
                }
            })
            setPlayerTwoSelectedCardIndex(undefined);
        }
    }, [playerTwoName, playCard, playerTwoSelectedCardIndex, setPlayerTwoSelectedCardIndex, setNotificationState, setWinnerName]);

    const onPlayerTwoPassed = useCallback(() => {
        setActivePlayer({
            playerActiveBean: {
                name: playerOneName
            }
        }).unwrap().then((_) => {
            setNotificationState("You pass your turn", NotificationType.Info);
        }).catch((reason) => {
            const {message} = reason.data;
            setNotificationState(message || "Failed to pass your turn", NotificationType.Error);
        })
    }, [setActivePlayer, playerOneName, setNotificationState]);

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
        disabledPlayButtonForPlayerTwo,
        winnerName,
        setWinnerName,
    }
}