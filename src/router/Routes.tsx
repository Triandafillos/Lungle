import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        { path: "/", element: <HomePage /> },
        { path: "/play", element: <GamePage /> },
        { path: "/login", element: <LoginPage /> }
    ]
}]);