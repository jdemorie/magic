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
