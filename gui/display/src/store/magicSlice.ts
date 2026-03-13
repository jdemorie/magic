import {createSlice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

export const sliceName = "magic";

interface Card {
    mana: number,
    selected: boolean,
}

export type ActivePlayer = "PlayerOne" | "PlayerTwo";

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
    active: ActivePlayer,
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
    },
    active: "PlayerOne",
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
            state.players.playerOne.cards.forEach((card, index) => {
                if (index === action.payload) {
                    state.players.playerOne.cards[index].selected = !card.selected;
                } else {
                    state.players.playerOne.cards[index].selected = false;
                }
            });
        },
        setPlayerTwoSelectedCard: (state, action: { payload: number }) => {
            state.players.playerTwo.cards.forEach((card, index) => {
                if (index === action.payload) {
                    state.players.playerTwo.cards[index].selected = !card.selected;
                } else {
                    state.players.playerTwo.cards[index].selected = false;
                }
            });
        },
        addPlayerOneCard: (state, action: { payload: Card }) => {
            state.players.playerOne.cards = [
                ...state.players.playerOne.cards,
                action.payload,
            ];
        },
        removePlayerOneCard: (state, action: { payload: number }) => {
            state.players.playerOne.cards =
                state.players.playerOne.cards.filter((card, index) => index !== action.payload);
        },
        addPlayerTwoCard: (state, action: { payload: Card }) => {
            state.players.playerTwo.cards = [
                ...state.players.playerTwo.cards,
                action.payload,
            ];
        },
        removePlayerTwoCard: (state, action: { payload: number }) => {
            state.players.playerTwo.cards =
                state.players.playerTwo.cards.filter((card, index) => index !== action.payload);
        },
        setActivePlayer: (state, action: { payload: ActivePlayer }) => {
            state.active = action.payload;
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

export const useActivePlayer = () =>
    useSelector((state: { [sliceName]: MagicState }) => state[sliceName].active);

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

export const useSetActivePlayer = () => {
    const dispatch = useDispatch();
    return useCallback((activePlayer: ActivePlayer) => {
            dispatch(setActivePlayer(activePlayer));
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
        setActivePlayer,
        resetState,
    },
} = magicSlice;