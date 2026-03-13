import React, {FC} from "react";
import styled from "styled-components";
import {Input, Tooltip} from 'antd';

interface MagicInputProps {
    placeholder?: string,
    value?: string,
    error?: string,
    onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | undefined,
    onInputKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void | undefined,
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const StyledInput = styled(Input)<{ $error?: boolean; }>`
    height: 2rem;
    width: 20rem;
`;

export const MagicInput: FC<MagicInputProps> = ({placeholder, value, error, onInputChange, onInputKeyDown}) => {
    return (
        <StyledContainer>
            <Tooltip title={error} open={error !== undefined} placement="right">
                <StyledInput type="text"
                             value={value}
                             placeholder={placeholder}
                             onChange={onInputChange}
                             onKeyDown={onInputKeyDown}
                             status={error === undefined ? undefined : "error"}
                />
            </Tooltip>
        </StyledContainer>
    );
}