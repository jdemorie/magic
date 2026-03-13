import {FC, useMemo} from "react";
import {MagicCard} from "./MagicCard";
import {usePlayerOneCards, usePlayerOneName, usePlayerTwoCards} from "../../store/magicSlice";

interface MagicCardPackProps {
    playerName: string,
}

export const MagicCardPack: FC<MagicCardPackProps> = ({playerName}) => {
    const playerOneName = usePlayerOneName();
    const playerOneCards = usePlayerOneCards();
    const playerTwoCards = usePlayerTwoCards();
    const cards = useMemo(() => {
        if (playerName === playerOneName) {
            return playerOneCards;
        }
        return playerTwoCards
    }, [playerName, playerOneName, playerOneCards, playerTwoCards]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '1rem',
        }}>
            {
                cards.map((card, index) => (
                    <MagicCard key={index} mana={card.mana} index={card.index} player={playerName}/>
                ))
            }
        </div>
    );
}