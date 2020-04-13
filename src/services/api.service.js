import axios from 'axios';
import APIPath from '../utils/fetchUrls';

export const makePayment = (site, amount, pay_date, card_number, expiration_date, security_code, zip_code) => {
  console.log('okokokokokokkokok');
  var bodyFormData = new FormData();
  // bodyFormData.append('site', site);
  // bodyFormData.append('amount', amount);
  // bodyFormData.append("pay_date", pay_date);
  // bodyFormData.append("routing_number", routing_number);
  // bodyFormData.append("account_number", account_number);

  bodyFormData.append('site', site);
  bodyFormData.append('amount', amount);
  bodyFormData.append("pay_date", pay_date);
  bodyFormData.append("card_number", "4403931455988551");
  bodyFormData.append("expiration_date", "865");
  bodyFormData.append("security_code", "49686");
  bodyFormData.append("zip_code", "49686");
  console.log("191919191191919");
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/makePayment/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log(response.data);
  return response;
};

// export const makePayment = uuid => {
//   console.log('okokokokokokkokok');
//   var bodyFormData = new FormData();
//   bodyFormData.append('uuid', uuid);
//   const response = axios({
//     method: 'post',

//     url: APIPath.root_url + `/api/makePayment/`,

//     headers: {'Content-Type': 'application/json'},

//     data: bodyFormData,
//   });
//   console.log(response.data);
//   return response;
// };

export const paymentAmount = (uuid, amount) => {
  var bodyFormData = new FormData();
  bodyFormData.append('uuid', uuid);
  bodyFormData.append('amount', amount);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/paymentAmount/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log('here we have');
  console.log(response.data);
  return response;
};

export const paymentDate = (uuid, todayDate, otherDate) => {
  var bodyFormData = new FormData();
  bodyFormData.append('uuid', uuid);
  bodyFormData.append('todayDate', todayDate);
  bodyFormData.append('otherDate', otherDate);
  console.log(APIPath.root_url, bodyFormData);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/paymentDate/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log('here we have');
  console.log(response.data);
  return response;
};

export const paymentDateBack = uuid => {
  console.log('fdsafdasfdsafds');
  var bodyFormData = new FormData();
  bodyFormData.append('uuid', uuid);
  console.log('back clcicked in api');
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/paymentDateBack/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log('here we have');
  console.log(response.data);
  return response;
};

export const paymentMethodBack = uuid => {
  console.log('PaymentReviewBack');
  var bodyFormData = new FormData();
  bodyFormData.append('uuid', uuid);
  console.log('back clcicked in api');
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/paymentMethodBack/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log('here we have');
  console.log(response.data);
  return response;
};

export const paymentMethod = (uuid, method) => {
  var bodyFormData = new FormData();
  bodyFormData.append('uuid', uuid);
  bodyFormData.append('status', method.status);
  bodyFormData.append('first', method.first);
  bodyFormData.append('second', method.second);
  console.log(APIPath.root_url, bodyFormData);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/paymentMethod/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log('here we have');
  console.log(response.data);
  return response;
};

export const saveBill = url => {
  var bodyFormData = new FormData();
  bodyFormData.append('url', url);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + '/api/saveBill/',

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  return response;
};

export const startLogin = (url, username, password) => {
  console.log("wowow this is it");
  var bodyFormData = new FormData();
  bodyFormData.append('siteUrl', url);
  bodyFormData.append('userId', username);
  bodyFormData.append('password', password);
  console.log(password, url);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + '/api/startLogin/',

    headers: {'Content-Type': 'application/json'},  

    data: bodyFormData,
  });
  return response;
};

export const refreshLogin = (url) => {
  console.log("wowow this is it");
  var bodyFormData = new FormData();
  bodyFormData.append('siteUrl', url);
  console.log("ddfdsafdsafds", url);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + '/api/refreshLogin/',

    headers: {'Content-Type': 'application/json'},  

    data: bodyFormData,
  });
  return response;
};

export const getBill = () => {
  console.log("153153153153");
  console.log(APIPath.root_url + '/api/getBill/');
  // bodyFormData.append('url', url);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + '/api/getBill/',

    headers: {'Content-Type': 'application/json'},

    data: "",
  });
  return response;
};

export const deleteBill = () => {
  console.log("deleteBill");
  console.log(APIPath.root_url + '/api/deleteBill/');
  var bodyFormData = new FormData();
  bodyFormData.append('url', url);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + '/api/getBill/',

    headers: {'Content-Type': 'application/json'},

    data: "",
  });
  return response;
};



export default {
  makePayment,
  paymentAmount,
  paymentDate,
  paymentDateBack,
  paymentMethodBack,
  paymentMethod,
  getBill,
  startLogin,
  refreshLogin,
};
