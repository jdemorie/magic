import {useState} from "react";

export const useWinnerName = () => {
    const [winnerName, setWinnerName] = useState<string>();

    return {
        winnerName,
        setWinnerName,
    }
}