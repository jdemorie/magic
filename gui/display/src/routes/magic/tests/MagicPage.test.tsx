import React from "react";
import {act, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {MagicPage} from "../MagicPage";
import {magicStore} from "../../../store/magicStore";
import userEvent from "@testing-library/user-event";
import {resetState} from "../../../store/magicSlice";
import {expectStartGameCalledWith, mockUseStartGameMutation} from "../../../openapi/mocks";
import {useStartGameMutation} from "../../../openapi/enhancedApi";

// Mock du module
jest.mock("../../../openapi/enhancedApi", () => ({
    ...jest.requireActual("../../../openapi/enhancedApi"),
    useStartGameMutation: jest.fn(),
}));

beforeEach(() => {
    magicStore.dispatch(resetState());
    (useStartGameMutation as jest.Mock).mockReset();
});

describe('MagicPage component', () => {
    it('should render magic page', async () => {
        mockUseStartGameMutation();
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
        expect(await screen.findByText(/Start/i)).toBeInTheDocument();
        const inputElements = await screen.findAllByRole("textbox");
        expect(inputElements).toHaveLength(2);
    });

    it('should display error message when player name are the same', async () => {
        mockUseStartGameMutation();
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
        const inputElements = await screen.findAllByRole("textbox");
        act(() => {
            userEvent.type(inputElements[0], "Player1");
            userEvent.type(inputElements[1], "Player1");
        });
        const errors = await screen.findAllByText(/Player names must be different/i);
        expect(errors).toHaveLength(2);
        expect(errors[0]).toBeInTheDocument();
        expect(errors[1]).toBeInTheDocument();
    });

    it('should disable start button when there is error or empty player name', async () => {
        mockUseStartGameMutation();
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByRole("button", {name: /Start/i})).toBeDisabled();
        const inputElements = await screen.findAllByRole("textbox");
        act(() => {
            userEvent.type(inputElements[0], "Player1");
            userEvent.type(inputElements[1], "Player2");
        });
        expect(screen.getByRole("button", {name: /Start/i})).toBeEnabled();
    });

    it('should navigate to game page when start button is clicked', () => {
        mockUseStartGameMutation();
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
        const inputElements = screen.getAllByRole("textbox");
        act(() => {
            userEvent.type(inputElements[0], "Player1");
            userEvent.type(inputElements[1], "Player2");
        });
        const startButton = screen.getByRole("button", {name: /Start/i});
        act(() => {
            userEvent.click(startButton);
        });
        expectStartGameCalledWith("Player1", "Player2");
    });
});