import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

export const sliceName = "magic";

interface MagicState {
    players: {
        playerOne: {
            name: string,
            selectedCardIndex?: number,
        },
        playerTwo: {
            name: string,
            selectedCardIndex?: number,
        },
    },
}

const initialState: MagicState = {
    players: {
        playerOne: {
            name: "",
        },
        playerTwo: {
            name: "",
        },
    },
}

export const magicSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setPlayerOneName: (state, action) => {
            state.players.playerOne.name = action.payload;
        },
        setPlayerTwoName: (state, action) => {
            state.players.playerTwo.name = action.payload;
        },
        setPlayerOneSelectedCardIndex: (state, action) => {
            state.players.playerOne.selectedCardIndex = action.payload;
        },
        setPlayerTwoSelectedCardIndex: (state, action) => {
            state.players.playerTwo.selectedCardIndex = action.payload;
        },
        resetState: () => initialState,
    },
});

export const usePlayerOneName = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerOne.name);

export const usePlayerTwoName = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerTwo.name);

export const usePlayerOneSelectedCardIndex = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerOne.selectedCardIndex);

export const usePlayerTwoSelectedCardIndex = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerTwo.selectedCardIndex);

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

export const useSetPlayerOneSelectedCardIndex = () => {
    const dispatch = useDispatch();
    return useCallback((index: number | undefined) => {
            dispatch(setPlayerOneSelectedCardIndex(index));
        },
        [dispatch],
    );
}

export const useSetPlayerTwoSelectedCardIndex = () => {
    const dispatch = useDispatch();
    return useCallback((index: number | undefined) => {
            dispatch(setPlayerTwoSelectedCardIndex(index));
        },
        [dispatch],
    );
}

export const {
    actions: {
        setPlayerOneName,
        setPlayerOneSelectedCardIndex,
        setPlayerTwoName,
        setPlayerTwoSelectedCardIndex,
        resetState,
    },
} = magicSlice;