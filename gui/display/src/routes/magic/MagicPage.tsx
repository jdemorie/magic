import {FC} from "react";
import {StyledBackgroundContainer, StyledButton, StyledTopRowContainer, StyledTypography} from "../../shared/SharedStyles";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {MagicInput} from "../../shared/MagicInput";
import {useMagicPage} from "./useMagicPage";
import {MagicImage} from "../../shared/MagicImage";
import styled from "styled-components";

const StyledCenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    gap: 1rem;
`;

export const MagicPage: FC = () => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();

    const {
        onStart,
        onPlayerOneNameChange,
        onPlayerTwoNameChange,
        playerOneErrorText,
        playerTwoErrorText,
        onKeyDown,
        disabled
    } = useMagicPage();

    return (
        <StyledBackgroundContainer initial={{ opacity: 0 }} animate={{
            opacity: 1,
            transition: {duration: 3}
        }}>
            <MagicImage src="/magic.jpg" alt="magic"/>
            <StyledTopRowContainer>
                <StyledTypography>Magic: the gathering</StyledTypography>
            </StyledTopRowContainer>
            <StyledCenterContainer>
                <MagicInput value={playerOneName}
                            onInputChange={onPlayerOneNameChange}
                            onInputKeyDown={onKeyDown}
                            placeholder="Enter name for player one"
                            error={playerOneErrorText}
                />
                <MagicInput value={playerTwoName}
                            onInputChange={onPlayerTwoNameChange}
                            onInputKeyDown={onKeyDown}
                            placeholder="Enter name for player two"
                            error={playerTwoErrorText}
                />
                <StyledButton onClick={onStart} disabled={disabled}>Start</StyledButton>
            </StyledCenterContainer>

        </StyledBackgroundContainer>);
}