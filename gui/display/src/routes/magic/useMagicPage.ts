import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {usePlayerOneName, usePlayerTwoName, useSetPlayerOneName, useSetPlayerTwoName} from "../../store/magicSlice";
import {useStartGame} from "./useStartGame";

export const useMagicPage = () => {
    const [playerOneErrorText, setPlayerOneErrorText] = useState<string | undefined>(undefined);
    const [playerTwoErrorText, setPlayerTwoErrorText] = useState<string | undefined>(undefined);
    const {startGame, isStartSuccess} = useStartGame();
    const setPlayerOneName = useSetPlayerOneName();
    const setPlayerTwoName = useSetPlayerTwoName();
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState<boolean>();

    useEffect(() => {
        setDisabled(playerOneName === "" || playerTwoName === "" || playerOneName === undefined || playerTwoName === undefined || playerOneName === playerTwoName);
        if (isStartSuccess) {
            navigate("/game");
        }
    }, [playerOneName, playerTwoName, isStartSuccess, navigate]);

    const onStart = useCallback((): void => {
        startGame(playerOneName!, playerTwoName!);
    }, [startGame, playerOneName, playerTwoName]);

    const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && !disabled) {
            startGame(playerOneName!, playerTwoName!);
        }
    }, [disabled, playerOneName, playerTwoName, startGame]);

    function setError() {
        setPlayerOneErrorText("Player names must be different");
        setPlayerTwoErrorText("Player names must be different");
    }

    function unsetError() {
        setPlayerOneErrorText(undefined);
        setPlayerTwoErrorText(undefined);
    }

    const onPlayerOneNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setPlayerOneName(value);
        if (playerTwoName === value) {
            setError();
            setDisabled(true);
        } else {
            unsetError();
            setDisabled(value === "" || playerTwoName === "" || value === undefined || playerTwoName === undefined || value === playerTwoName);
        }
    }, [setPlayerOneName, playerTwoName]);

    const onPlayerTwoNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;
        setPlayerTwoName(value);
        if (playerOneName === value) {
            setError();
            setDisabled(true);
        } else {
            unsetError();
            setDisabled(playerOneName === "" || value === "" || playerOneName === undefined || value === undefined || playerOneName === value);
        }
    }, [setPlayerTwoName, playerOneName]);

    return {
        onStart,
        onPlayerOneNameChange,
        onPlayerTwoNameChange,
        playerOneErrorText,
        playerTwoErrorText,
        onKeyDown,
        disabled,
    }
}