import React, {useEffect, useState} from "react";
import {StyledTypography} from "../../shared/SharedStyles";
import styled from "styled-components";
import {useMagicGame} from "./useMagicGame";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {motion} from "motion/react"
import {MagicCardPack} from "./MagicCardPack";
import {MagicAvatar} from "./MagicAvatar";
import {testIds} from "../../shared/testIds";
import {MagicExitButton} from "./MagicExitButton";
import {MagicButton} from "../../shared/MagicButton";
import {useGetPlayerHealthAndManaQuery} from "../../openapi/enhancedApi";
import {useMessageNotification} from "../../store/useMessageNotification";
import {MagicCardNumber} from "./MagicCardNumber";
import {MagicWinnerModal} from "./MagicWinnerModal";

const BackgroundContainer = styled(motion.div)`
    height: 100vh;
    width: 100%;
    background-image: url('/magic-card.jpg');
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-columns: 10% 40% 40%;
    grid-template-rows: 10% 40% 40% 10%;
`;

const GridDiv = styled.div<{ $column?: string; $row?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: ${props => props.$column ? props.$column : '1 / 1'};
    grid-row: ${props => props.$row ? props.$row : '1 / 1'};
    gap: 2rem;
`;

const CardDiv = styled.div<{ $column?: string; $row?: string }>`
    display: flex;
    align-items: center;
    grid-column: ${props => props.$column ? props.$column : '1 / 1'};
    grid-row: ${props => props.$row ? props.$row : '1 / 1'};
    gap: 1rem;
    overflow-x: auto;
    max-width: 100%;
    max-height: 80%;
`;

const CardNumberDiv = styled.div<{ $column?: string; $row?: string }>`
    grid-column: ${props => props.$column ? props.$column : '1 / 1'};
    grid-row: ${props => props.$row ? props.$row : '1 / 1'};
`;

export const MagicGame = () => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const playerOneHealthAndMana = useGetPlayerHealthAndManaQuery({
        playerName: playerOneName
    });
    const playerTwoHealthAndMana = useGetPlayerHealthAndManaQuery({
        playerName: playerTwoName
    });
    const {contextHolder, sendNotification, notificationState} = useMessageNotification();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const {
        onPlayerOnePlay,
        onPlayerTwoPlay,
        onPlayerOnePassed,
        onPlayerTwoPassed,
        disabledPlayButtonForPlayerOne,
        disabledPlayButtonForPlayerTwo,
        winnerName,
    } = useMagicGame();

    useEffect(() => {
        if (notificationState) {
            sendNotification(notificationState.message, notificationState.type);
        }
        if (winnerName) {
            setIsModalOpen(true);
        }
    }, [notificationState, sendNotification, winnerName]);

    const closeModalMessage = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}
            <BackgroundContainer initial={{scale: 0}} animate={{
                scale: 1,
                transition: {duration: 1}
            }}>
                <GridDiv $column="1 / 5" $row="1 / 1" style={{
                    marginTop: '1rem',
                }}>
                    <StyledTypography>{playerOneName}</StyledTypography>
                    <MagicAvatar src="/ulbrig.png"
                                 value={playerOneHealthAndMana.data?.health}
                                 testId={testIds.playerOneAvatar}/>
                    <MagicAvatar src="/mana.png"
                                 value={playerOneHealthAndMana.data?.manaSlots}
                                 color="#696FC7"
                                 testId={testIds.playerOneMana}/>
                    <MagicButton onClick={onPlayerOnePlay}
                                 testId={testIds.playButtonForPlayerOne}
                                 disabled={disabledPlayButtonForPlayerOne}
                                 src="/attack.png"
                                 tooltipText="Play"/>
                    <MagicButton onClick={onPlayerOnePassed}
                                 testId={testIds.passButtonForPlayerOne}
                                 disabled={disabledPlayButtonForPlayerOne}
                                 src="/passed.png"
                                 tooltipText="Pass your turn"/>
                </GridDiv>
                <CardDiv $column="2 / 4" $row="2 / 2">
                    <MagicCardPack playerName={playerOneName}
                                   disabled={disabledPlayButtonForPlayerOne}/>
                </CardDiv>
                <CardNumberDiv $column="4 / 5" $row="2 / 2">
                    <MagicCardNumber playerName={playerOneName} testId={testIds.cardNumberForPlayerOne}/>
                </CardNumberDiv>
                <CardDiv $column="2 / 4" $row="3 / 3">
                    <MagicCardPack playerName={playerTwoName}
                                   disabled={disabledPlayButtonForPlayerTwo}/>
                </CardDiv>
                <CardNumberDiv $column="4 / 5" $row="3 / 3">
                    <MagicCardNumber playerName={playerTwoName} testId={testIds.cardNumberForPlayerTwo}/>
                </CardNumberDiv>
                <GridDiv $column="1 / 5" $row="4 / 4" style={{
                    marginBottom: '1rem',
                }}>
                    <StyledTypography>{playerTwoName}</StyledTypography>
                    <MagicAvatar src="/regill.png"
                                 value={playerTwoHealthAndMana.data?.health}
                                 testId={testIds.playerTwoAvatar}/>
                    <MagicAvatar src="/mana.png"
                                 value={playerTwoHealthAndMana.data?.manaSlots}
                                 color="#696FC7"
                                 testId={testIds.playerTwoMana}/>
                    <MagicButton onClick={onPlayerTwoPlay}
                                 testId={testIds.playButtonForPlayerTwo}
                                 disabled={disabledPlayButtonForPlayerTwo}
                                 src="/attack.png"
                                 tooltipText="Play"/>
                    <MagicButton onClick={onPlayerTwoPassed}
                                 testId={testIds.passButtonForPlayerTwo}
                                 disabled={disabledPlayButtonForPlayerTwo}
                                 src="/passed.png"
                                 tooltipText="Pass your turn"/>
                </GridDiv>
                <GridDiv $column="1 / 1" $row="1 / 5">
                    <MagicExitButton/>
                </GridDiv>
            </BackgroundContainer>
            <MagicWinnerModal isModalOpen={isModalOpen} handleOk={closeModalMessage} winner={winnerName}/>
        </>
    )
}