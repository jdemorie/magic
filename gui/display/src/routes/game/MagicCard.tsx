import {Card} from "antd";
import React, {FC, useCallback, useMemo} from "react";
import {usePlayerOneCards, usePlayerOneName, usePlayerTwoCards, useSetPlayerOneSelectedCard} from "../../store/magicSlice";
import {testIds} from "../../shared/testIds";

interface MagicCardProps {
    index: number,
    mana: number,
    player: string,
}

const {Meta} = Card;

export const MagicCard: FC<MagicCardProps> = ({index, mana, player}) => {
    const playerOneName = usePlayerOneName();
    const playerOneCards = usePlayerOneCards();
    const playerTwoCards = usePlayerTwoCards();
    const setPlayerOneSelectedCard = useSetPlayerOneSelectedCard();
    const setPlayerTwoSelectedCard = useSetPlayerOneSelectedCard();

    const srcIcon = useMemo(() => {
        const value = mana + 1;
        return `/magic-card-${value}.png`;
    }, [mana]);

    const selected = useMemo(() => {
        if (player === playerOneName) {
            return playerOneCards[index]?.selected;
        }
        return playerTwoCards[index]?.selected;
    }, [index, player, playerOneName, playerOneCards, playerTwoCards]);

    const onClickDown = useCallback((_: React.MouseEvent<HTMLDivElement>) => {
        if (player === playerOneName) {
            setPlayerOneSelectedCard(index);
        } else {
            setPlayerTwoSelectedCard(index);
        }
    }, [index, player, playerOneName, setPlayerOneSelectedCard, setPlayerTwoSelectedCard]);

    return (
        <div style={{
            width: '150px',
            height: '200px'
        }}>
            <Card onMouseDown={onClickDown} data-testid={`${testIds.card}-${player}-${index}-${mana}`} style={{
                borderColor: '#696FC7',
                boxShadow: selected ? '0 4px 12px #FF5733' : '0 2px 8px #A7AAE1',
                borderRadius: 8,
            }} hoverable>
                <img src={srcIcon} alt={`${srcIcon}-alt`} style={{width: '100%', height: '100%'}}/>
                <Meta title={`${mana} mana`}/>
            </Card>
        </div>
    );
}