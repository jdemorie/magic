import {MagicImage} from "../../shared/MagicImage";
import {StyledBackgroundContainer, StyledBottomContainer, StyledButton, StyledTopRowContainer, StyledTypography} from "../../shared/SharedStyles";
import styled from "styled-components";
import {useMagicGame} from "./useMagicGame";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {Avatar} from "antd";

const StyledLeftContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0;
    align-items: center;
    margin-left: 2rem;
`;

export const MagicGame = () => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const {onBackButtonClick} = useMagicGame();

    return (
        <StyledBackgroundContainer initial={{scale: 0}} animate={{
            scale: 1,
            transition: {duration: 1}
        }}>
            <MagicImage src="/magic-card.jpg" alt="magic-card"/>
            <StyledTopRowContainer>
                <Avatar size={64} icon={<MagicImage src="/ulbrig.png" alt="ulbrig"/>}/>
                <StyledTypography>{playerOneName}</StyledTypography>
                <StyledButton>Play</StyledButton>
            </StyledTopRowContainer>
            <StyledBottomContainer>
                <Avatar size={64} icon={<MagicImage src="/regill.png" alt="regill"/>}/>
                <StyledTypography>{playerTwoName}</StyledTypography>
                <StyledButton>Play</StyledButton>
            </StyledBottomContainer>
            <StyledLeftContainer>
                <StyledButton onClick={onBackButtonClick}>End</StyledButton>
            </StyledLeftContainer>
        </StyledBackgroundContainer>
    )
}