import {
    INPUT_AMOUNT,
    INPUT_AMOUNT_FAILED,
    BILL_ACCOUNT_TYPE,
    BILL_ACCOUNT_TYPE_FAILED,
    BILL_ACCOUNT_INFO,
    BILL_ACCOUNT_INFO_FAILED,
  } from '../actionTypes';
  import AsyncStorage from '@react-native-community/async-storage';
  
  export const inputAmount = (amount) => async dispatch => {
    console.log('input amount action is called');
    // const res = { token: { accessToken: "adsfasdfads", refreshToken: "asdfasdfa" }, info: { email } };
    try {
      //res = api call
      const payload = {amount: amount};
      await AsyncStorage.setItem(
        'amount',
        JSON.stringify(payload),
      );
      dispatch({type: INPUT_AMOUNT, payload: payload});
    } catch (error) {
      console.log('this is amount action errorrorororororororo');
      console.log(error);
      dispatch({type: INPUT_AMOUNT_FAILED, payload: {amountErrMsg: error.response.data}});
      throw error;
    }
  };
  
  export const billAccountType = (account_type) => async dispatch => {
    console.log("bill type action is called");
    try {
        const payload = {bill_account_type: account_type};
        await AsyncStorage.setItem(
          'bill_account_type',
          JSON.stringify(payload),
        );
        dispatch({type: BILL_ACCOUNT_TYPE, payload: payload});
    } catch (error) {
        console.log('this is bill account type action errorrorororororororo');
        console.log(error);
        dispatch({type: BILL_ACCOUNT_TYPE_FAILED, payload: {accountErrMsg: error.response.data}});
        throw error;
    }
  };

  export const billAccountInfo = (card_number, expiration_date, security_code, zip_code) => async dispatch => {
    console.log("bill type action is called", card_number);
    try {
        const payload = {card_number: card_number, expiration_date: expiration_date, security_code: security_code, zip_code: zip_code};
        await AsyncStorage.setItem(
          'bill_account_info',
          JSON.stringify(payload),
        );
        dispatch({type: BILL_ACCOUNT_INFO, payload: payload});
    } catch (error) {
        console.log('this is bill account type action errorrorororororororo');
        console.log(error);
        dispatch({type: BILL_ACCOUNT_INFO_FAILED, payload: {accountINFOErrMsg: error.response.data}});
        throw error;
    }
  };
  
  