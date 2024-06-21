import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

// 기본 api URL 매핑
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
})

// json 데이터 형식 지정
// 로그인 데이터 형식
export interface IUserLogInVariables {
    email: string;
    password: string;
}

// 회원 가입 데이터 형식
export interface IUserSignUpVariables {
    email: string;
    password: string;
    name: string;
    gender: string;
    birth: string;
}

// 로그인 성공 데이터 형식
export interface IUsernameLoginSuccess {
    ok: string;
}

// 로그인 실패 데이터 형식
export interface IUsernameLoginError {
    error: string;
}

// 판매 입찰 데이터 형식
export interface ISellVariables {
    sell_price: number;
    sell_book_isbn: string;
}

// 구매 입찰 데이터 형식
export interface IPurVariables {
    purchase_price: number;
    purchase_book_isbn: string;
}

// 거래 데이터 형식
export interface ITradeVariables {
    trade_price: number;
    trade_book_isbn: string;
}

// 리뷰 데이터 형식
export interface ISubmitReviewVariables {
    content: string;
    rating: number;
    bookId: string;
}

// 기본 유저 정보 API 호출
export const userInfoApi = () => instance.get('user/me').then((response) => response.data);

// 로그아웃 API 호출
export const logOutApi = () => instance.post('user/logout', null, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
}).then(response => response.data);

// 로그인 API 호출
export const logInApi = ({email, password}: IUserLogInVariables) => instance.post('user/login', {email, password}, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
}).then(response => response.data);

// 카카오 로그인 API 호출
export const kakaoLogInApi = (code:string) => instance.post(`/user/login/kakao`, {code}, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
}).then(response => response.status);

// 회원가입 API 호출
export const signUpApi = ({email, password, name, gender, birth}: IUserSignUpVariables) => 
    instance.post('user/signup', {email, password, name, gender, birth}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
}).then(response => response.data);

// 카테고리 별 책 리스트 API 호출
export const categoryBookListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, categoryId] = queryKey;
    return instance.get(`book/categorybooklist/${categoryId}`).then((response) => response.data);
}

// 카테고리 이름 API 호출
export const categoryApi = ({queryKey}: QueryFunctionContext) => {
    const [_, categoryId] = queryKey;
    return instance.get(`category/${categoryId}`).then((response) => response.data)
}

// 책 상세 API 호출
export const bookDetailApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`book/bookdetail/${bookId}`).then((response) => response.data);
}

// 내 서재 목록 API 호출
export const bookShelfApi = () => instance.get("bookshelf/").then((response) => response.data);

// 장바 구니 목록 API 호출
export const cartListApi = () => instance.get("cart/").then((response) => response.data);

// 장바구니 추가 API 호출
export const addCartApi = (book_isbn:string) => 
    instance.post('cart/add', {book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
}).then(response => response.data);

// 장바구니 삭제 API 호출
export const deleteCartApi = (book_isbn:string[]) =>
    instance.delete('cart/delete', {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
          },
        data: {
            book_isbn: book_isbn
        }
    }
).then((response) => response.data);

// 결제할 책 목록 API 호출
export const orderItemApi = (book_isbn: string[]) =>
    instance.post('order/', {book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

// 결제 API 호출
export const orderApi = (book_isbn: string[]) =>
    instance.post('order/payment', {book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

// 거래 기록 API 호출
export const TradeChartApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/tradechart/${bookId}`).then((response) => response.data);
}

// 판매 입찰 정보 API 호출
export const SellListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/selllist/${bookId}`).then((response) => response.data);
}

// 구매 입찰 정보 API 호출
export const purchaseListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/purchaselist/${bookId}`).then((response) => response.data);
}

// 거래할 책 정보 API 호출
export const tradeBookApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`book/trade/${bookId}`).then((response) => response.data);
}

// 즉시 구매가 정보 API 호출
export const immediatePurPriceApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/immediate-pur-price/${bookId}`).then((response) => response.data);
}

// 즉시 판매가 정보 API 호출
export const immediateSellPriceApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/immediate-sell-price/${bookId}`).then((response) => response.data);
}

// 판매 입찰 API 호출
export const sellApi = ({sell_price, sell_book_isbn}: ISellVariables) =>
    instance.post('trade/sell', {sell_price, sell_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

// 구매 입찰 API 호출
export const purchaseApi = ({purchase_price, purchase_book_isbn}: IPurVariables) =>
    instance.post('trade/purchase', {purchase_price, purchase_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

// 즉시 판매 API 호출
export const immediateSellApi = ({trade_price, trade_book_isbn}: ITradeVariables) =>
    instance.post('trade/immediate-sell', {trade_price, trade_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

// 즉시 구매 API 호출
export const immediatePurApi = ({trade_price, trade_book_isbn}: ITradeVariables) =>
    instance.post('trade/immediate-purchase', {trade_price, trade_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

// 리뷰 목록 API 호출
export const reviewListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`review/reviewlist/${bookId}`).then((response) => response.data);
}

// 리뷰 작성 API 호출
export const submitReviewApi = ({content, rating, bookId}: ISubmitReviewVariables) => 
    instance.post('review/submit-review', {content, rating, bookId}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
}).then(response => response.data);

// 검색 API 호출
export const searchBookListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, keyWord] = queryKey;
    return instance.get(`book/search/${keyWord}`).then((response) => response.data);
} 



