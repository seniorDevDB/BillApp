import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_OUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from '../actionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {accountService} from '../../services';

export const signIn = (email, password) => async dispatch => {
  console.log('in signin in signin');
  // const res = { token: { accessToken: "adsfasdfads", refreshToken: "asdfasdfa" }, info: { email } };
  try {
    //res = api call
    const response = await accountService.signin(email, password);
    const payload = {token: response.data.key, email: email};
    await AsyncStorage.setItem(
      'billling_app_user_token',
      JSON.stringify(payload),
    );
    dispatch({type: LOG_IN_SUCCESS, payload: payload});
  } catch (error) {
    console.log('this is auth action errorrorororororororo');
    console.log(error.response.data);
    dispatch({type: LOG_IN_FAILED, payload: {errMsg: error.response.data}});
    throw error;
  }
};

export const isSignedIn = () => async dispatch => {
  try {
    //res = api call
    const token = await AsyncStorage.getItem('billling_app_user_token');
    if (!token) throw new Error('no token defined');
    dispatch({type: LOG_IN_SUCCESS, payload: JSON.parse(token)});
  } catch (error) {
    throw error;
  }
};

export const signOut = () => async dispatch => {
  try {
    //res = api call
    const response = await accountService.signout();
  } catch (error) {}
  try {
    await AsyncStorage.removeItem('billling_app_user_token');
  } catch (error) {}
  dispatch({type: LOG_OUT});
};

export const signUp = (
  firstname,
  lastname,
  email,
  password1,
  password2,
) => async () => {
  try {
    // res = api call
    const res = await accountService.signup(
      firstname,
      lastname,
      email,
      password1,
      password2,
    );
    console.log('what are you doling sir?');
    console.log(res);
    // dispatch({type: SignUp})
    return 'suc';
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
    // dispatch({type: SIGNUP_FAILED, payload: { signupErrMsg: error.response.data.email[0] }})
    throw error;
  }
};
