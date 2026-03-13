import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router";
import {MagicGame} from "../MagicGame";
import {magicStore} from "../../../store/magicStore";

describe('MagicGame component', () => {
    it('should render magic game', async () => {
        render(
            <Provider store={magicStore}>
                <MemoryRouter>
                    <MagicGame/>
                </MemoryRouter>
            </Provider>
        );
        expect(await screen.findByText(/End/i)).toBeInTheDocument();
    });
});