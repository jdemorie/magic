import {useStartGameMutation} from "../../openapi/enhancedApi";
import {useCallback, useState} from "react";

export const useStartGame = () => {
    const [start] = useStartGameMutation();
    const [isGameStart, setGameStart] = useState(false);
    const [isStartSuccess, setStartSuccess] = useState(false);

    const startGame = useCallback((playerOneName: string, playerTwoName: string) => {
            setGameStart(true);
            start({
                playerOneName: playerOneName,
                playerTwoName: playerTwoName,
            })
                .then(
                    (_) => {
                        setStartSuccess(true);
                    },
                    (reason) => {
                        setStartSuccess(false);
                    },
                )
                .finally(() => {
                    setGameStart(false);
                });
        },
        [start],
    );
    return {startGame, isStartSuccess, isGameStart};
};