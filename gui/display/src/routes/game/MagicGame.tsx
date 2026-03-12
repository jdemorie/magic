import {MagicImage} from "../../shared/MagicImage";
import {StyledButton, StyledTypography} from "../../shared/SharedStyles";
import styled from "styled-components";
import {useMagicGame} from "./useMagicGame";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";
import {Avatar} from "antd";
import {motion} from "motion/react"
import {MagicCardPack} from "./MagicCardPack";

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

export const MagicGame = () => {
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const {onBackButtonClick} = useMagicGame();

    return (
        <BackgroundContainer initial={{scale: 0}} animate={{
            scale: 1,
            transition: {duration: 1}
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gridColumn: '1 / 5',
                gridRow: '1 / 1',
                gap: '1rem',
            }}>
                <Avatar size={64} icon={<MagicImage src="/ulbrig.png" alt="ulbrig"/>}/>
                <StyledTypography>{playerOneName}</StyledTypography>
                <StyledButton>Play</StyledButton>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gridColumn: '1 / 5',
                gridRow: '2 / 2',
            }}>
                <MagicCardPack/>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gridColumn: '1 / 5',
                gridRow: '3 / 3',
            }}>
                <MagicCardPack/>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gridColumn: '1/ 5',
                gridRow: '4 / 4',
                gap: '1rem',
            }}>
                <Avatar size={64} icon={<MagicImage src="/regill.png" alt="regill"/>}/>
                <StyledTypography>{playerTwoName}</StyledTypography>
                <StyledButton>Play</StyledButton>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gridColumn: '1 / 1',
                gridRow: '1 / 5',
            }}>
                <StyledButton onClick={onBackButtonClick}>End</StyledButton>
            </div>
        </BackgroundContainer>
    )
}