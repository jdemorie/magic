import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {usePlayerOneName, usePlayerTwoName, useSetPlayerOneName, useSetPlayerTwoName} from "../../store/magicSlice";
import {useStartGame} from "./useStartGame";

export const useMagicPage = () => {
    const [playerOneErrorText, setPlayerOneErrorText] = useState<string | undefined>(undefined);
    const [playerTwoErrorText, setPlayerTwoErrorText] = useState<string | undefined>(undefined);
    const {startGame} = useStartGame();
    const setPlayerOneName = useSetPlayerOneName();
    const setPlayerTwoName = useSetPlayerTwoName();
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState<boolean>();
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        setDisabled(playerOneName === "" || playerTwoName === "" || playerOneName === undefined || playerTwoName === undefined || playerOneName === playerTwoName);
        if (started) {
            navigate("/game");
        }
    }, [playerOneName, playerTwoName, navigate, started]);

    const onStart = useCallback((): void => {
        startGame(() => {
            setStarted(true);
        }, (reason) => {
            setStarted(false);
        });
    }, [startGame]);

    const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && !disabled) {
            startGame(() => {
                setStarted(true);
            }, (reason) => {
                setStarted(false);
            });
        }
    }, [disabled, startGame]);

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