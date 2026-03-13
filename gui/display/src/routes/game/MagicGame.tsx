import React from "react";
import {StyledButton, StyledTypography} from "../../shared/SharedStyles";
import styled from "styled-components";
import {useMagicGame} from "./useMagicGame";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {motion} from "motion/react"
import {MagicCardPack} from "./MagicCardPack";
import {MagicAvatar} from "./MagicAvatar";

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

const StyledDiv = styled.div<{ $column?: string; $row?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-column: ${props => props.$column ? props.$column : '1 / 1'};
    grid-row: ${props => props.$row ? props.$row : '1 / 1'};
    gap: 1rem;
`;

const StyledCardDiv = styled.div<{ $column?: string; $row?: string }>`
    display: flex;
    align-items: center;
    grid-column: ${props => props.$column ? props.$column : '1 / 1'};
    grid-row: ${props => props.$row ? props.$row : '1 / 1'};
    gap: 1rem;
    overflow-x: auto;
    max-width: 100%;
    max-height: 80%;
`;

export const MagicGame = () => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const {onBackButtonClick} = useMagicGame();

    return (
        <BackgroundContainer initial={{scale: 0}} animate={{
            scale: 1,
            transition: {duration: 1}
        }}>
            <StyledDiv $column="1 / 5" $row="1 / 1" style={{
                marginTop: '1rem',
            }}>
                <MagicAvatar src="/ulbrig.png" value={20}/>
                <MagicAvatar src="/mana.png" value={0} color="#696FC7"/>
                <StyledTypography>{playerOneName}</StyledTypography>
                <StyledButton>Play</StyledButton>
            </StyledDiv>
            <StyledCardDiv $column="2 / 4" $row="2 / 2">
                <MagicCardPack/>
            </StyledCardDiv>
            <StyledCardDiv $column="2 / 4" $row="3 / 3">
                <MagicCardPack/>
            </StyledCardDiv>
            <StyledDiv $column="1 / 5" $row="4 / 4" style={{
                marginBottom: '1rem',
            }}>
                <MagicAvatar src="/regill.png" value={20}/>
                <MagicAvatar src="/mana.png" value={0} color="#696FC7"/>
                <StyledTypography>{playerTwoName}</StyledTypography>
                <StyledButton>Play</StyledButton>
            </StyledDiv>
            <StyledDiv $column="1 / 1" $row="1 / 5">
                <StyledButton onClick={onBackButtonClick}>End</StyledButton>
            </StyledDiv>
        </BackgroundContainer>
    )
}