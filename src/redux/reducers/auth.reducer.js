import { LOG_OUT, LOG_IN_SUCCESS, LOG_IN_FAILED, SIGNUP_FAILED } from "../actionTypes";

const INITIAL_STATE = {
    token: "asdfasdfasdf",
    email: "",
    errMsg: "",
    // signupErrMsg: "sss",
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            const { token, email } = action.payload;
            return { ...state, token, email, errMsg: "" };
        case LOG_IN_FAILED:
            const { errMsg } = action.payload;
            return { ...state, token: "", email: "", errMsg };
        case LOG_OUT:
            return { ...state, token: "", email: "" };
        // case SIGNUP_FAILED:
        //     const { signupErrMsg } = action.payload;
        //     console.log("eeeeeeeeedddddddddd");
        //     console.log(signupErrMsg);
        //     return { ...state, token: {}, info: {}, errMsg: {}, signupErrMsg};
        default:
            return state;
    }
}

export default authReducer;