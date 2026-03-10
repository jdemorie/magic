import React from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        element: <div><Outlet/></div>,
        children: []
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
