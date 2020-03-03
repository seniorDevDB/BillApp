import { LOG_OUT, LOG_IN_SUCCESS, LOG_IN_FAILED } from "../actionTypes";

const INITIAL_STATE = {
    token: {},
    info: {},
    errMsg: "",
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            const { token, info } = action.payload;
            return { ...state, token, info, errMsg: "" };
        case LOG_IN_FAILED:
            const { errMsg } = action.payload;
            return { ...state, token: {}, info: {}, errMsg };
        case LOG_OUT:
            return { ...state, token: {}, info: {} };
        default:
            return state;
    }
}

export default authReducer;