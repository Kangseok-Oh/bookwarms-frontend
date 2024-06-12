import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true,
})

export interface IUserLogInVariables {
    email: string;
    password: string;
}

export interface IUserSignUpVariables {
    email: string;
    password: string;
    name: string;
    gender: string;
    birth: string;
}

export interface IUsernameLoginSuccess {
    ok: string;
}

export interface IUsernameLoginError {
    error: string;
}

export interface ISellVariables {
    sell_price: number;
    sell_book_isbn: string;
}

export interface IPurVariables {
    purchase_price: number;
    purchase_book_isbn: string;
}

export interface ITradeVariables {
    trade_price: number;
    trade_book_isbn: string;
}

export interface ISubmitReviewVariables {
    content: string;
    rating: number;
    bookId: string;
}


export const userInfoApi = () => instance.get('user/me').then((response) => response.data);

export const logOutApi = () => instance.post('user/logout', null, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
}).then(response => response.data);

export const logInApi = ({email, password}: IUserLogInVariables) => instance.post('user/login', {email, password}, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
}).then(response => response.data);

export const kakaoLogInApi = (code:string) => instance.post(`/user/login/kakao`, {code}, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
}).then(response => response.status);

export const signUpApi = ({email, password, name, gender, birth}: IUserSignUpVariables) => 
    instance.post('user/signup', {email, password, name, gender, birth}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
}).then(response => response.data);

export const categoryBookListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, categoryId] = queryKey;
    return instance.get(`book/categorybooklist/${categoryId}`).then((response) => response.data);
}

export const categoryApi = ({queryKey}: QueryFunctionContext) => {
    const [_, categoryId] = queryKey;
    return instance.get(`category/${categoryId}`).then((response) => response.data)
}

export const bookDetailApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`book/bookdetail/${bookId}`).then((response) => response.data);
}

export const bookShelfApi = () => instance.get("bookshelf/").then((response) => response.data);

export const cartListApi = () => instance.get("cart/").then((response) => response.data);

export const addCartApi = (book_isbn:string) => 
    instance.post('cart/add', {book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
}).then(response => response.data);

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

export const orderItemApi = (book_isbn: string[]) =>
    instance.post('order/', {book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

export const orderApi = (book_isbn: string[]) =>
    instance.post('order/payment', {book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

export const TradeChartApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/tradechart/${bookId}`).then((response) => response.data);
}

export const SellListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/selllist/${bookId}`).then((response) => response.data);
}

export const purchaseListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/purchaselist/${bookId}`).then((response) => response.data);
}

export const tradeBookApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`book/trade/${bookId}`).then((response) => response.data);
}

export const immediatePurPriceApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/immediate-pur-price/${bookId}`).then((response) => response.data);
}

export const immediateSellPriceApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`trade/immediate-sell-price/${bookId}`).then((response) => response.data);
}

export const sellApi = ({sell_price, sell_book_isbn}: ISellVariables) =>
    instance.post('trade/sell', {sell_price, sell_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

export const purchaseApi = ({purchase_price, purchase_book_isbn}: IPurVariables) =>
    instance.post('trade/purchase', {purchase_price, purchase_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

export const immediateSellApi = ({trade_price, trade_book_isbn}: ITradeVariables) =>
    instance.post('trade/immediate-sell', {trade_price, trade_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

export const immediatePurApi = ({trade_price, trade_book_isbn}: ITradeVariables) =>
    instance.post('trade/immediate-purchase', {trade_price, trade_book_isbn}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
).then((response) => response.data);

export const reviewListApi = ({queryKey}: QueryFunctionContext) => {
    const [_, bookId] = queryKey;
    return instance.get(`review/reviewlist/${bookId}`).then((response) => response.data);
}

export const submitReviewApi = ({content, rating, bookId}: ISubmitReviewVariables) => 
    instance.post('review/submit-review', {content, rating, bookId}, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
}).then(response => response.data);



