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
}).then(response => response.data)