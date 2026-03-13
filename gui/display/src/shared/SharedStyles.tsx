import styled from "styled-components";
import {Typography} from 'antd';
import {motion} from "motion/react"

export const StyledTypography = styled(motion.create(Typography))`
    color: white;
    font-size: 2rem;
`;
