import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {magicStore} from "./store/magicStore";

test('renders application', () => {
    render(
        <Provider store={magicStore}>
            <App/>
        </Provider>
    );
});
