import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./components/NotFound";
import Home from "./components/home/Home";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/login/SignUp";
import BookList from "./components/book/BookList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "user/login",
                element: <LogIn/>
            },
            {
                path: "user/signup",
                element: <SignUp/>
            },
            {
                path: "book",
                element: <BookList/>
            }
        ]
    }
]);

export default router;