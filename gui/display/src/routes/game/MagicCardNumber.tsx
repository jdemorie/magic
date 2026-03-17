import React, {FC} from "react";
import {MagicAvatar} from "./MagicAvatar";
import {useGetPlayerCardsQuery} from "../../openapi/enhancedApi";

interface MagicCardNumberProps {
    playerName: string,
    testId: string,
}

export const MagicCardNumber: FC<MagicCardNumberProps> = ({playerName, testId}) => {
    const cards = useGetPlayerCardsQuery({
        playerName: playerName
    });
    return (
        <div>
            <MagicAvatar shape="square" src="/cards.png" value={cards.data?.length} color="#6E4F35" testId={testId}/>
        </div>
    );
}