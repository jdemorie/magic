import {useNavigate} from "react-router";
import {useCallback} from "react";

export const useMagicGame = () => {
    const navigate = useNavigate();

    const onBackButtonClick = useCallback(() => {
        navigate("/magic");
    }, [navigate]);

    return {
        onBackButtonClick,
    }
}