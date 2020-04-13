import {
    INPUT_AMOUNT,
    INPUT_AMOUNT_FAILED,
    BILL_ACCOUNT_TYPE,
    BILL_ACCOUNT_TYPE_FAILED,
    BILL_ACCOUNT_INFO,
    BILL_ACCOUNT_INFO_FAILED,
  } from '../actionTypes';
  
  const INITIAL_STATE = {
    amount: '',
    amountErrMsg: '',
    bill_account_type: '',
    accountErrMsg: '',
    bill_account_info: {},
    accountInfoErrMsg: '',
  };
  
  const paymentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case INPUT_AMOUNT:
        const {amount} = action.payload;
        return {...state, amount, amountErrMsg: ''};
      case INPUT_AMOUNT_FAILED:
        const {amountErrMsg} = action.payload;
        return {...state, amount: '', amountErrMsg};
      case BILL_ACCOUNT_TYPE:
        const {bill_account_type} = action.payload;
        return {...state, bill_account_type, accountErrMsg: ''};
      case BILL_ACCOUNT_TYPE_FAILED:
        const {accountErrMsg} = action.payload;
        return {...state, bill_account_type: '', accountErrMsg};
      case BILL_ACCOUNT_INFO:
        console.log("dsfdsafdsa",action.payload);
        const {card_number,expiration_date, security_code, zip_code} = action.payload;
        console.log("363636363636", zip_code);
        bill_account_info = {card_number,expiration_date, security_code, zip_code};
        return {...state, bill_account_info, accountInfoErrMsg: ''};
      case BILL_ACCOUNT_INFO_FAILED:
        const {accountInfoErrMsg} = action.payload;
        return {...state, bill_account_info: '', accountInfoErrMsg};
      default:
        return state;
    }
  };
  
  export default paymentReducer;
  