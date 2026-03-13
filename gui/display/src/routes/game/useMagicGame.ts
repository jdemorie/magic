import {useNavigate} from "react-router";
import React, {useCallback, useMemo} from "react";
import {
    useActivePlayer,
    usePlayerOneCards,
    usePlayerTwoCards,
    useRemovePlayerOneCard,
    useRemovePlayerTwoCard,
    useSetActivePlayer
} from "../../store/magicSlice";

export const useMagicGame = () => {
    const navigate = useNavigate();
    const removePlayerOneCard = useRemovePlayerOneCard();
    const removePlayerTwoCard = useRemovePlayerTwoCard();
    const playerOneCards = usePlayerOneCards();
    const playerTwoCards = usePlayerTwoCards();
    const activePlayer = useActivePlayer();
    const setActivePlayer = useSetActivePlayer();

    const onBackButtonClick = useCallback((_: React.MouseEvent<HTMLElement> | undefined) => {
        navigate("/magic");
    }, [navigate]);

    const onPlayerOnePlay = useCallback((_: React.MouseEvent<HTMLButtonElement>) => {
        const index = playerOneCards.findIndex(card => card.selected);
        if (index !== -1) {
            removePlayerOneCard(index);
        }
    }, [playerOneCards, removePlayerOneCard]);

    const onPlayerOnePassed = useCallback((_: React.MouseEvent<HTMLButtonElement>) => {
        setActivePlayer('PlayerTwo');
    }, [setActivePlayer]);

    const onPlayerTwoPlay = useCallback((_: React.MouseEvent<HTMLButtonElement>) => {
        const index = playerTwoCards.findIndex(card => card.selected);
        if (index !== -1) {
            removePlayerTwoCard(index);
        }
    }, [playerTwoCards, removePlayerTwoCard]);

    const onPlayerTwoPassed = useCallback((_: React.MouseEvent<HTMLButtonElement>) => {
        setActivePlayer('PlayerOne');
    }, [setActivePlayer]);

    const disabledPlayButtonForPlayerOne = useMemo(() => activePlayer !== 'PlayerOne', [activePlayer]);
    const disabledPlayButtonForPlayerTwo = useMemo(() => activePlayer !== 'PlayerTwo', [activePlayer]);

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