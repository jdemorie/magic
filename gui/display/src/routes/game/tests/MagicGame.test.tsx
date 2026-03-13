import React from "react";
import {act, render, screen, within} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import {MagicGame} from "../MagicGame";
import {magicStore} from "../../../store/magicStore";
import {addPlayerOneCard, resetState, setPlayerOneName, setPlayerTwoMana} from "../../../store/magicSlice";
import {testIds} from "../../../shared/testIds";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    magicStore.dispatch(resetState());
});

describe('MagicGame component', () => {
    it('should render magic game with two players with 20 of health and 0 of mana', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoMana("Player Two"));
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

    it('should render magic card when player receives one', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoMana("Player Two"));
            magicStore.dispatch(addPlayerOneCard({
                mana: 3,
                selected: false,
            }));
        });
        const card = await screen.findByTestId(`${testIds.card}-Player One-0-3`);
        screen.debug(card);
        expect(card).toBeInTheDocument();
        const cardStyle = window.getComputedStyle(card);
        expect(cardStyle.boxShadow).toBe('0 2px 8px #A7AAE1');
    });

    it('should select and deselect card when player clicks on it', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoMana("Player Two"));
            magicStore.dispatch(addPlayerOneCard({
                mana: 3,
                selected: false,
            }));
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

    it('should remove selected card when player has played his turn', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        act(() => {
            magicStore.dispatch(setPlayerOneName("Player One"));
            magicStore.dispatch(setPlayerTwoMana("Player Two"));
            magicStore.dispatch(addPlayerOneCard({
                mana: 3,
                selected: false,
            }));
            magicStore.dispatch(addPlayerOneCard({
                mana: 8,
                selected: false,
            }));
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
        expect(screen.queryByTestId(`${testIds.card}-Player One-0-3`)).not.toBeInTheDocument();
    });
});