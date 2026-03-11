import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

interface MagicState {
    players: {
        playerOneName: string,
        playerTwoName: string,
    }
}

const initialState: MagicState = {
    players: {
        playerOneName: "",
        playerTwoName: "",
    }
}

export const magicSlice = createSlice({
    name: "magic",
    initialState,
    reducers: {
        setPlayerOneName: (state, action) => {
            state.players.playerOneName = action.payload;
        },
        setPlayerTwoName: (state, action) => {
            state.players.playerTwoName = action.payload;
        },
    },
});

export const usePlayerOneName = () =>
    useSelector((state: { ['magic']: MagicState }) => state['magic'].players.playerOneName);

export const usePlayerTwoName = () =>
    useSelector((state: { ['magic']: MagicState }) => state['magic'].players.playerTwoName);

export const useSetPlayerOneName = () => {
    const dispatch = useDispatch();
    return useCallback((name: string) => {
            dispatch(setPlayerOneName(name));
        },
        [dispatch],
    );
}

export const useSetPlayerTwoName = () => {
    const dispatch = useDispatch();
    return useCallback((name: string) => {
            dispatch(setPlayerTwoName(name));
        },
        [dispatch],
    );
}

export const {
    actions: {
        setPlayerOneName,
        setPlayerTwoName,
    },
} = magicSlice;