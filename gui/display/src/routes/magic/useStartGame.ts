import {useStartGameMutation} from "../../openapi/enhancedApi";
import {useCallback} from "react";
import {usePlayerOneName, usePlayerTwoName} from "../../store/magicSlice";

export const useStartGame = () => {
    const [start] = useStartGameMutation();
    const playerOneName = usePlayerOneName();
    const playerTwoName = usePlayerTwoName();

    const startGame = useCallback((successCallback: () => void, errorCallback: (reason: any) => void) => {
            start({
                playerOneName: playerOneName,
                playerTwoName: playerTwoName,
            }).unwrap().then((_) => {
                    successCallback();
                }
            ).catch((reason) => {
                const {message} = reason.data;
                errorCallback(message || "Failed to start game");
            });
        },
        [start, playerOneName, playerTwoName],
    );
    return {startGame};
};