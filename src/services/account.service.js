import axios from "axios";
import APIPath from "../utils/fetchUrls"

export const signin = (email, password) => {
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    const response = axios({
        method: "post",

        url: APIPath.root_url + `/api/accounts/auth/login/`,

        headers: { "Content-Type": "application/json" },

        data: bodyFormData
    });
    return response;
}

export const signout = () => {

}

export const signup = (firstname, lastname, email, password1, password2) => {
    var bodyFormData = new FormData();
    bodyFormData.append("firstname", firstname);
    bodyFormData.append("lastname", lastname);
    bodyFormData.append("email", email);
    bodyFormData.append("password1", password1);
    bodyFormData.append("password2", password2);
    console.log(APIPath.root_url, bodyFormData);
    const response = axios({
        method: "post",

        url: APIPath.root_url + `/api/accounts/auth/register/`,

        headers: { "Content-Type": "application/json" },

        data: bodyFormData
    });
    console.log("here we have")
    console.log(response.data)
    return response;
}

export default {
    signin,
    signout,
    signup,
};