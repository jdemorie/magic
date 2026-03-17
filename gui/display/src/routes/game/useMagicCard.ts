import {
    usePlayerOneName,
    usePlayerOneSelectedCardIndex,
    usePlayerTwoSelectedCardIndex,
    useSetPlayerOneSelectedCardIndex,
    useSetPlayerTwoSelectedCardIndex
} from "../../store/magicSlice";
import React, {useCallback, useMemo} from "react";
import {MagicCardProps} from "./MagicCard";

export const useMagicCard = ({index, mana, player}: MagicCardProps) => {
    const playerOneName = usePlayerOneName();
    const selectedCardIndexForPlayerOne = usePlayerOneSelectedCardIndex();
    const selectedCardIndexForPlayerTwo = usePlayerTwoSelectedCardIndex();
    const setPlayerOneSelectedCardIndex = useSetPlayerOneSelectedCardIndex();
    const setPlayerTwoSelectedCardIndex = useSetPlayerTwoSelectedCardIndex();

    const srcIcon = useMemo(() => {
        const manaValue = parseInt(mana, 10);
        return `/magic-card-${(manaValue + 1).toString()}.png`;
    }, [mana]);

    const selected = useMemo(() => {
        if (player === playerOneName) {
            return selectedCardIndexForPlayerOne === index;
        }
        return selectedCardIndexForPlayerTwo === index;
    }, [index, player, playerOneName, selectedCardIndexForPlayerOne, selectedCardIndexForPlayerTwo]);

    const onClickDown = useCallback((_: React.MouseEvent<HTMLDivElement>) => {
        if (player === playerOneName) {
            setPlayerOneSelectedCardIndex(selected ? undefined : index);
        } else {
            setPlayerTwoSelectedCardIndex(selected ? undefined : index);
        }
    }, [index, player, playerOneName, setPlayerOneSelectedCardIndex, setPlayerTwoSelectedCardIndex, selected]);

    return {
        srcIcon, onClickDown, selected
    }
}