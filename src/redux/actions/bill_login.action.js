import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILED,
    LOG_OUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
  } from '../actionTypes';
  import AsyncStorage from '@react-native-community/async-storage';
  import {apiService} from '../../services';
  
  export const bill_login = (site, username, password) => async dispatch => {
    console.log('in signin in signin');
    // const res = { token: { accessToken: "adsfasdfads", refreshToken: "asdfasdfa" }, info: { email } };
    try {
      //res = api call
      const response = await apiService.startLogin(site, username, password);
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

  
  