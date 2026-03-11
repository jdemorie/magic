import React, {FC} from "react";
import styled from "styled-components";

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

const StyledLabel = styled.label`
    color: red;
    font-size: 1rem;
    height: 0.5rem;
`;

const StyledInput = styled.input<{ $error?: boolean; }>`
    height: 2rem;
    width: 20rem;
    border-color: ${props => props.$error ? "red" : "black"};
`;

export const MagicInput: FC<MagicInputProps> = ({placeholder, value, error, onInputChange, onInputKeyDown}) => {
    return (
        <StyledContainer>
            <StyledInput type="text"
                         value={value}
                         placeholder={placeholder}
                         onChange={onInputChange}
                         onKeyDown={onInputKeyDown}
                         $error={!!error}
            />
            <StyledLabel>{error}</StyledLabel>
        </StyledContainer>
    );
}