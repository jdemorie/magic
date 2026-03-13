import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

export const sliceName = "magic";

interface Card {
    index: number,
    mana: number,
    selected: boolean,
}

interface MagicState {
    players: {
        playerOne: {
            name: string,
            health: number,
            mana: number,
            cards: Card[],
        },
        playerTwo: {
            name: string,
            health: number,
            mana: number,
            cards: Card[],
        },
    },
}

const initialState: MagicState = {
    players: {
        playerOne: {
            name: "",
            health: 20,
            mana: 0,
            cards: [],
        },
        playerTwo: {
            name: "",
            health: 20,
            mana: 0,
            cards: [],
        },
    }
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
        setPlayerOneHealth: (state, action) => {
            state.players.playerOne.health = action.payload;
        },
        setPlayerTwoHealth: (state, action) => {
            state.players.playerTwo.health = action.payload;
        },
        setPlayerOneMana: (state, action) => {
            state.players.playerOne.mana = action.payload;
        },
        setPlayerTwoMana: (state, action) => {
            state.players.playerTwo.mana = action.payload;
        },
        setPlayerOneSelectedCard: (state, action: { payload: number }) => {
            state.players.playerOne.cards = state.players.playerOne.cards.map((card) => {
                if (card.index === action.payload) {
                    return {
                        ...card,
                        selected: !card.selected,
                    }
                }
                return {
                    ...card,
                    selected: false,
                }
            });
        },
        setPlayerTwoSelectedCard: (state, action: { payload: number }) => {
            state.players.playerTwo.cards = state.players.playerTwo.cards.map((card) => {
                if (card.index === action.payload) {
                    return {
                        ...card,
                        selected: !card.selected,
                    }
                }
                return {
                    ...card,
                    selected: false,
                }
            });
        },
        addPlayerOneCard: (state, action: { payload: Card }) => {
            action.payload.index = state.players.playerOne.cards.length;
            state.players.playerOne.cards = [
                ...state.players.playerOne.cards,
                action.payload,
            ];
        },
        removePlayerOneCard: (state, action: { payload: number }) => {
            const found =
                state.players.playerOne.cards.find((card) => card.mana === action.payload);
            state.players.playerOne.cards =
                state.players.playerOne.cards.filter((card) => card === found);
        },
        addPlayerTwoCard: (state, action: { payload: Card }) => {
            action.payload.index = state.players.playerTwo.cards.length;
            state.players.playerTwo.cards = [
                ...state.players.playerTwo.cards,
                action.payload,
            ];
        },
        removePlayerTwoCard: (state, action: { payload: number }) => {
            const found =
                state.players.playerTwo.cards.find((card) => card.index === action.payload);
            state.players.playerTwo.cards =
                state.players.playerTwo.cards.filter((card) => card === found);
        },
        resetState: () => initialState,
    },
});

export const usePlayerOneName = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerOne.name);

export const usePlayerTwoName = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerTwo.name);

export const usePlayerOneHealth = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerOne.health);

export const usePlayerTwoHealth = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerTwo.health);

export const usePlayerOneMana = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerOne.mana);

export const usePlayerTwoMana = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerTwo.mana);

export const usePlayerOneCards = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerOne.cards);

export const usePlayerTwoCards = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].players.playerTwo.cards);

export const useAddPlayerOneCard = () => {
    const dispatch = useDispatch();
    return useCallback((card: Card) => {
            dispatch(addPlayerOneCard(card));
        },
        [dispatch],
    );
};

export const useRemovePlayerOneCard = () => {
    const dispatch = useDispatch();
    return useCallback((index: number) => {
            dispatch(removePlayerOneCard(index));
        },
        [dispatch],
    );
};

export const useAddPlayerTwoCard = () => {
    const dispatch = useDispatch();
    return useCallback((card: Card) => {
            dispatch(addPlayerTwoCard(card));
        },
        [dispatch],
    );
};

export const useRemovePlayerTwoCard = () => {
    const dispatch = useDispatch();
    return useCallback((index: number) => {
            dispatch(removePlayerTwoCard(index));
        },
        [dispatch],
    );
};

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

export const useSetPlayerOneHealth = () => {
    const dispatch = useDispatch();
    return useCallback((health: number) => {
            dispatch(setPlayerOneHealth(health));
        },
        [dispatch],
    );
}

export const useSetPlayerTwoHealth = () => {
    const dispatch = useDispatch();
    return useCallback((health: number) => {
            dispatch(setPlayerTwoHealth(health));
        },
        [dispatch],
    );
}

export const useSetPlayerOneMana = () => {
    const dispatch = useDispatch();
    return useCallback((mana: number) => {
            dispatch(setPlayerOneMana(mana));
        },
        [dispatch],
    );
}

export const useSetPlayerTwoMana = () => {
    const dispatch = useDispatch();
    return useCallback((mana: number) => {
            dispatch(setPlayerTwoMana(mana));
        },
        [dispatch],
    );
}

export const useSetPlayerOneSelectedCard = () => {
    const dispatch = useDispatch();
    return useCallback((index: number) => {
            dispatch(setPlayerOneSelectedCard(index));
        },
        [dispatch],
    );
}

export const useSetPlayerTwoSelectedCard = () => {
    const dispatch = useDispatch();
    return useCallback((index: number) => {
            dispatch(setPlayerTwoSelectedCard(index));
        },
        [dispatch],
    );
}

export const {
    actions: {
        setPlayerOneName,
        setPlayerOneHealth,
        setPlayerOneMana,
        setPlayerOneSelectedCard,
        addPlayerOneCard,
        removePlayerOneCard,
        setPlayerTwoName,
        setPlayerTwoHealth,
        setPlayerTwoMana,
        setPlayerTwoSelectedCard,
        addPlayerTwoCard,
        removePlayerTwoCard,
        resetState,
    },
} = magicSlice;