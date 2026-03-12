import styled from "styled-components";
import {Button, Typography} from 'antd';
import {motion} from "motion/react"

export const StyledButton = styled(motion.create(Button))`
    height: 2rem;
    width: 5rem;
    font-size: 1rem;
    cursor: pointer;
`;

export const StyledTypography = styled(motion.create(Typography))`
    color: white;
    font-size: 2rem;
`;

export const StyledTopRowContainer = styled(motion.div)`
    display: flex;
    flex-direction: row;
    position: absolute;
    padding: 1rem;
    top: 0;
    align-items: center;
    gap: 1rem;
`;

export const StyledBackgroundContainer = styled(motion.div)`
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const StyledBottomContainer = styled(motion.div)`
    display: flex;
    flex-direction: row;
    position: absolute;
    padding: 1rem;
    gap: 1rem;
    bottom: 0;
    align-items: center;
`;
