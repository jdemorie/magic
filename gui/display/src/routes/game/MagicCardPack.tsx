import {FC, useMemo} from "react";
import {MagicCard} from "./MagicCard";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {useGetPlayerCardsQuery} from "../../openapi/enhancedApi";

interface MagicCardPackProps {
    playerName: string,
    disabled?: boolean,
}

export const MagicCardPack: FC<MagicCardPackProps> = ({playerName, disabled}) => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const playerOneCards = useGetPlayerCardsQuery({
        playerName: playerOneName
    });
    const playerTwoCards = useGetPlayerCardsQuery({
        playerName: playerTwoName
    });
    const cards = useMemo(() => {
        if (playerName === playerOneName) {
            return playerOneCards.data;
        }
        return playerTwoCards.data;
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
                cards?.map((card, index) => (
                    <MagicCard key={index} mana={card.mana} index={index} player={playerName} disabled={disabled}/>
                ))
            }
        </div>
    );
}