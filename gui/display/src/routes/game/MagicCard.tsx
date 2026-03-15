import {Card} from "antd";
import React, {FC} from "react";
import {testIds} from "../../shared/testIds";
import {useMagicCard} from "./useMagicCard";

export interface MagicCardProps {
    index: number,
    mana: string,
    player: string,
    disabled?: boolean,
}

const {Meta} = Card;

export const MagicCard: FC<MagicCardProps> = ({index, mana, player, disabled}) => {
    const {
        srcIcon,
        onClickDown,
        selected
    } = useMagicCard({index, mana, player});

    return (
        <div style={{
            width: '150px',
            height: '200px'
        }}>
            <Card onMouseDown={onClickDown} data-testid={`${testIds.card}-${player}-${index}-${mana}`} style={{
                borderColor: disabled ? '#d9d9d9' : '#696FC7',
                boxShadow: disabled ? 'none' : (selected ? '0 4px 12px #FF5733' : '0 2px 8px #A7AAE1'),
                borderRadius: 8,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
            }} hoverable={!disabled}>
                <img src={srcIcon} alt={`${srcIcon}-alt`} style={{width: '100%', height: '100%'}}/>
                <Meta title={`${mana} mana`}/>
            </Card>
        </div>
    );
}