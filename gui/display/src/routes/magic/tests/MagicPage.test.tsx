import React from "react";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {MagicPage} from "../MagicPage";
import {magicStore} from "../../../store/magicStore";
import userEvent from "@testing-library/user-event";

describe('MagicPage component', () => {
    it('should render magic page', async () => {
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
        expect(inputElements[0]).toHaveAttribute("placeholder", "Enter name for player one");
        expect(inputElements[1]).toHaveAttribute("placeholder", "Enter name for player two");
    });

    it('should display error message when player name are the same', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
        const inputElements = await screen.findAllByRole("textbox");
        userEvent.type(inputElements[0], "Player1");
        userEvent.type(inputElements[1], "Player1");
        const errors = await screen.findAllByText(/Player names must be different/i);
        expect(errors).toHaveLength(2);
        expect(errors[0]).toBeInTheDocument();
        expect(errors[1]).toBeInTheDocument();
    });

    it('should disable start button when there is error or empty player name', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByRole("button", {name: /Start/i})).toBeDisabled();
        const inputElements = await screen.findAllByRole("textbox");
        userEvent.type(inputElements[0], "Player1");
        userEvent.type(inputElements[1], "Player2");
        expect(screen.getByRole("button", {name: /Start/i})).toBeEnabled();
    });
});