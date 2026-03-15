import React from "react";
import {act, render, screen, within} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import {MagicGame} from "../MagicGame";
import {magicStore} from "../../../store/magicStore";
import {resetState, setPlayerOneName, setPlayerTwoName} from "../../../store/magicSlice";
import {testIds} from "../../../shared/testIds";
import userEvent from "@testing-library/user-event";
import {
    expectPlayCardCalledWith,
    mockUseGetActivePlayerQuery,
    mockUseGetPlayerCardsQuery,
    mockUseGetPlayerCardsQueryImplementation,
    mockUseGetPlayerHealthAndManaQuery,
    mockUsePlayCardMutation,
    mockUseSetActivePlayerMutation,
    reset
} from "../../../openapi/mocks";

// Mock du module
jest.mock("../../../openapi/enhancedApi", () => ({
    ...jest.requireActual("../../../openapi/enhancedApi"),
    useStartGameMutation: jest.fn(),
    usePlayCardMutation: jest.fn(),
    useGetPlayerHealthAndManaQuery: jest.fn(),
    useSetPlayerHealthAndManaMutation: jest.fn(),
    useGetActivePlayerQuery: jest.fn(),
    useSetActivePlayerMutation: jest.fn(),
    useGetPlayerCardsQuery: jest.fn(),
    useSetSelectedPlayerCardMutation: jest.fn(),
    useDeletePlayerCardMutation: jest.fn(),
}));

beforeEach(() => {
    magicStore.dispatch(resetState());
    reset();
});

describe('MagicGame component', () => {
    it('should render magic game with two players with 20 of health and 0 of mana', async () => {
        mockUsePlayCardMutation();
        mockUseGetPlayerHealthAndManaQuery({
            name: "Player One",
            health: 20,
            manaSlots: 0,
        }, {
            name: "Player Two",
            health: 20,
            manaSlots: 0,
        });
        mockUseGetActivePlayerQuery("Player One");
        mockUseSetActivePlayerMutation("Player Two");
        mockUseGetPlayerCardsQuery([
            {
                mana: "3",
            },
        ]);
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoName("Player Two"));
        });

        expect(await screen.findByTestId(testIds.exitButton)).toBeInTheDocument();
        expect(await screen.findByText(/Player One/i)).toBeInTheDocument();
        expect(await screen.findByText(/Player Two/i)).toBeInTheDocument();

        const playerOneAvatar = await screen.findByTestId(testIds.playerOneAvatar);
        expect(playerOneAvatar).toBeInTheDocument();
        expect(await within(playerOneAvatar).findByTitle(/20/i)).toBeInTheDocument();
        const playerTwoAvatar = await screen.findByTestId(testIds.playerTwoAvatar);
        expect(playerTwoAvatar).toBeInTheDocument();
        expect(await within(playerTwoAvatar).findByTitle(/20/i)).toBeInTheDocument();

        const playerOneMana = await screen.findByTestId(testIds.playerOneMana);
        expect(playerOneMana).toBeInTheDocument();
        expect(await within(playerOneMana).findByTitle(/0/i)).toBeInTheDocument();
        const playerTwoMana = await screen.findByTestId(testIds.playerTwoMana);
        expect(playerTwoMana).toBeInTheDocument();
    });

    it('should render magic card when player has one', async () => {
        mockUsePlayCardMutation();
        mockUseGetPlayerHealthAndManaQuery({
            name: "Player One",
            health: 20,
            manaSlots: 0,
        }, {
            name: "Player Two",
            health: 20,
            manaSlots: 0,
        });
        mockUseGetActivePlayerQuery("Player One");
        mockUseSetActivePlayerMutation("Player Two");
        mockUseGetPlayerCardsQuery([
            {
                mana: "3",
            },
        ]);
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoName("Player Two"));
        });
        const card = await screen.findByTestId(`${testIds.card}-Player One-0-3`);
        expect(card).toBeInTheDocument();
        const cardStyle = window.getComputedStyle(card);
        expect(cardStyle.boxShadow).toBe('0 2px 8px #A7AAE1');
    });

    it('should select and deselect card when player one clicks on it', async () => {
        mockUsePlayCardMutation();
        mockUseGetPlayerHealthAndManaQuery({
            name: "Player One",
            health: 20,
            manaSlots: 0,
        }, {
            name: "Player Two",
            health: 20,
            manaSlots: 0,
        });
        mockUseGetActivePlayerQuery("Player One");
        mockUseSetActivePlayerMutation("Player Two");
        mockUseGetPlayerCardsQuery([
            {
                mana: "3",
            },
        ]);
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoName("Player Two"));
        });
        const card = await screen.findByTestId(`${testIds.card}-Player One-0-3`);
        expect(card).toBeInTheDocument();
        const cardStyle = window.getComputedStyle(card);
        expect(cardStyle.boxShadow).toBe('0 2px 8px #A7AAE1');
        act(() => {
            userEvent.click(card);
        });
        const selectedCardStyle = window.getComputedStyle(card);
        expect(selectedCardStyle.boxShadow).toBe('0 4px 12px #FF5733');
        act(() => {
            userEvent.click(card);
        });
        const deselectedCardStyle = window.getComputedStyle(card);
        expect(deselectedCardStyle.boxShadow).toBe('0 2px 8px #A7AAE1');
    });

    it('should select and deselect card when player two clicks on it', async () => {
        mockUsePlayCardMutation();
        mockUseGetPlayerHealthAndManaQuery({
            name: "Player One",
            health: 20,
            manaSlots: 0,
        }, {
            name: "Player Two",
            health: 20,
            manaSlots: 0,
        });
        mockUseGetActivePlayerQuery("Player Two");
        mockUseSetActivePlayerMutation("Player Two");
        mockUseGetPlayerCardsQuery([
            {
                mana: "3",
            },
        ]);
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoName("Player Two"));
        });
        const playerOnePass = await screen.findByTestId(testIds.passButtonForPlayerOne);
        expect(playerOnePass).toBeInTheDocument();
        act(() => {
            userEvent.click(playerOnePass);
        });
        const card = await screen.findByTestId(`${testIds.card}-Player Two-0-3`);
        expect(card).toBeInTheDocument();
        const cardStyle = window.getComputedStyle(card);
        expect(cardStyle.boxShadow).toBe('0 2px 8px #A7AAE1');
        act(() => {
            userEvent.click(card);
        });
        const selectedCardStyle = window.getComputedStyle(card);
        expect(selectedCardStyle.boxShadow).toBe('0 4px 12px #FF5733');
        act(() => {
            userEvent.click(card);
        });
        const deselectedCardStyle = window.getComputedStyle(card);
        expect(deselectedCardStyle.boxShadow).toBe('0 2px 8px #A7AAE1');
    });

    it('should call play api when player has played his turn', async () => {
        mockUsePlayCardMutation();
        mockUseGetPlayerHealthAndManaQuery({
            name: "Player One",
            health: 20,
            manaSlots: 0,
        }, {
            name: "Player Two",
            health: 20,
            manaSlots: 0,
        });
        mockUseGetActivePlayerQuery("Player One");
        mockUseSetActivePlayerMutation("Player Two");
        mockUseGetPlayerCardsQuery([
            {
                mana: "3",
            },
        ]);
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoName("Player Two"));
        });
        const card = await screen.findByTestId(`${testIds.card}-Player One-0-3`);
        act(() => {
            userEvent.click(card);
        });
        const play = await screen.findByTestId(`${testIds.playButtonForPlayerOne}`);
        expect(play).toBeInTheDocument();
        act(() => {
            userEvent.click(play);
        });
        expectPlayCardCalledWith("Player One", 0);
    });
});