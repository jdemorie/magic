import React from 'react';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router";
import {MagicPage} from "./routes/magic/MagicPage";
import ErrorElement from "./shared/ErrorElement";
import {MagicGame} from "./routes/game/MagicGame";

const router = createBrowserRouter([
    {
        path: '/',
        element: <div><Outlet/></div>,
        children: [
            {
                index: true,
                element: <Navigate to="/magic" replace={true}/>,
            },
            {
                path: 'magic',
                element: <MagicPage/>,
                errorElement: <ErrorElement/>,
            },
            {
                path: 'game',
                element: <MagicGame/>,
                errorElement: <ErrorElement/>,
            }
        ]
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
