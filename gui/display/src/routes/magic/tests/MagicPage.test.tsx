import React from "react";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Provider} from "react-redux";
import {MagicPage} from "../MagicPage";
import {legacy_configureStore as configureStore} from 'redux-mock-store';

const mockStore = configureStore([]);

const store = mockStore(() => {
    return {
        [""]: {}
    }
});

describe("MagicPage component", () => {
    it("renders magic page", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <MagicPage/>
                </MemoryRouter>
            </Provider>
        );
    });
});