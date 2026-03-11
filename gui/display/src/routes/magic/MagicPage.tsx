import {FC} from "react";
import styled from "styled-components";
import {StyledBackgroundContainer, StyledButton} from "../../shared/SharedStyles";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {MagicInput} from "../../shared/MagicInput";
import {useMagicPage} from "./useMagicPage";
import {Image} from "../../shared/Image";

export const StyledCenterContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
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
        <StyledBackgroundContainer>
            <Image src="/magic.jpg" alt="magic"/>
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