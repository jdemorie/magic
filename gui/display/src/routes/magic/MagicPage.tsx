import React, {FC, useEffect, useRef} from "react";
import {StyledTypography} from "../../shared/SharedStyles";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {MagicInput} from "../../shared/MagicInput";
import {useMagicPage} from "./useMagicPage";
import styled from "styled-components";
import {motion} from "motion/react";
import {MagicButton} from "../../shared/MagicButton";
import {InputRef} from "antd";
import {useMessageNotification} from "../../store/useMessageNotification";

const BackgroundContainer = styled(motion.div)`
    height: 100vh;
    width: 100%;
    background-image: url('/magic.jpg');
    background-size: cover;
    background-position: center;
    display: grid;
    grid-template-rows: 10% 90%;
`;

export const MagicPage: FC = () => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const {contextHolder, sendNotification, notificationState} = useMessageNotification();

    const {
        onStart,
        onPlayerOneNameChange,
        onPlayerTwoNameChange,
        playerOneErrorText,
        playerTwoErrorText,
        onKeyDown,
        disabled
    } = useMagicPage();
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (notificationState) {
            sendNotification(notificationState.message, notificationState.type);
        }
    }, [notificationState, sendNotification]);

    return (
        <>
            {contextHolder}
            <BackgroundContainer initial={{opacity: 0}} animate={{
                opacity: 1,
                transition: {duration: 3}
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gridRow: '1 / 1',
                }}>
                    <StyledTypography>Magic: the gathering</StyledTypography>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gridRow: '2 / 2',
                    gap: '1rem',
                }}>
                    <MagicInput ref={inputRef}
                                value={playerOneName}
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
                    <MagicButton onClick={onStart} disabled={disabled} text="Start"/>
                </div>
            </BackgroundContainer>
        </>
    );
}