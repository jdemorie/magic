import React, {FC, useMemo} from "react";
import {Modal} from "antd";
import {usePlayerOneName} from "../../store/magicSlice";

interface MagicWinnerModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    winner?: string;
}

export const MagicWinnerModal: FC<MagicWinnerModalProps> = ({isModalOpen, handleOk, winner}) => {
    const playerOneName = usePlayerOneName();

    const srcIcon = useMemo(() => {
        return winner === playerOneName ? "/ulbrig.png" : "/regill.png";
    }, [playerOneName, winner]);

    return (
        <Modal
            title="Winner"
            closable={{'aria-label': 'Custom Close Button'}}
            open={isModalOpen}
            onOk={handleOk}
        >
            <p>{winner} has won !</p>
            <img src={srcIcon} alt={`${srcIcon}-alt`} style={{width: '100%', height: '100%'}}/>
        </Modal>
    );
}