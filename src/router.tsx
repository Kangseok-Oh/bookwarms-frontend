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
        // 기본 화면 템플릿
        path: "/",
        element: <Root />,
        errorElement: <NotFound/>,
        children: [
            // 홈 
            {
                path: "",
                element: <Home/>
            },
            // 로그인 
            {
                path: "user/login",
                element: <LogIn/>,                
            },
            // 카카오 로그인
            {
                path: "user/login/kakao",
                element: <KakaoLogIn/>
            },
            // 회원 가입
            {
                path: "user/signup",
                element: <SignUp/>
            },
            // 장바구니
            {
                path: "user/cart",
                element: <Cart/>
            },
            // 내 서재
            {
                path: "user/bookshelf",
                element: <Bookshelf/>
            },
            // 책 리스트(프로토타입)
            {
                path: "book",
                element: <BookList/>
            },
            // 카테고리 별 책 리스트
            {
                path: "book/category/:categoryId",
                element: <CategoryBookList/>
            },
            // 책 상세
            {
                path: "book/:bookId",
                element: <BookDetail/>
            },
            // 책 판매입찰
            {
                path: "book/trade/sell/:bookId",
                element: <BookTradeSell/>
            },
            // 책 구매입찰
            {
                path: "book/trade/purchase/:bookId",
                element: <BookTradePur/>
            },
            // 책 검색
            {
                path: "book/search/:keyWord",
                element: <SearchBookList/>
            },
            // 결제
            {
                path: "payment",
                element: <Payment/>
            },
            // 결제완료
            {
                path: "payment/ok",
                element: <PaymentOk/>
            },
        ]
    },
    // 전자책 뷰어
    {
        path: "epub/:bookId",
        element: <BookViewer/>
    }
]);

export default router;