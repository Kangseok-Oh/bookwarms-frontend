import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import NotFound from "./components/NotFound";
import Home from "./components/home/Home";
import LogIn from "./components/login/LogIn";
import SignUp from "./components/login/SignUp";
import BookList from "./components/book/BookList";
import Cart from "./components/cart/Cart";
import Bookshelf from "./components/bookshelf/Bookshelf";
import BookDetail from "./components/bookdetail/BookDetail";
import Payment from "./components/payment/Payment";
import PaymentOk from "./components/payment/PaymentOk";
import KakaoLogIn from "./components/login/KakaoLogIn";
import CategoryBookList from "./components/book/CategoryBookList";
import BookViewer from "./components/bookshelf/BookViewer";
import BookTradeSell from "./components/booktrade/BookTradeSell";
import BookTradePur from "./components/booktrade/BookTradePur";
import SearchBookList from "./components/book/SearchBookList";

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
                element: <LogIn/>,                
            },
            {
                path: "user/login/kakao",
                element: <KakaoLogIn/>
            },
            {
                path: "user/signup",
                element: <SignUp/>
            },
            {
                path: "user/cart",
                element: <Cart/>
            },
            {
                path: "user/bookshelf",
                element: <Bookshelf/>
            },
            {
                path: "book",
                element: <BookList/>
            },
            {
                path: "book/category/:categoryId",
                element: <CategoryBookList/>
            },
            {
                path: "book/:bookId",
                element: <BookDetail/>
            },
            {
                path: "book/trade/sell/:bookId",
                element: <BookTradeSell/>
            },
            {
                path: "book/trade/purchase/:bookId",
                element: <BookTradePur/>
            },
            {
                path: "book/search/:keyWord",
                element: <SearchBookList/>
            },
            {
                path: "payment",
                element: <Payment/>
            },
            {
                path: "payment/ok",
                element: <PaymentOk/>
            },
        ]
    },
    {
        path: "epub/:bookId",
        element: <BookViewer/>
    }
]);

export default router;