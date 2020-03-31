import axios from 'axios';
import APIPath from '../utils/fetchUrls';

export const makePayment = uuid => {
  console.log('okokokokokokkokok');
  var bodyFormData = new FormData();
  bodyFormData.append('uuid', uuid);
  const response = axios({
    method: 'post',

    url: APIPath.root_url + `/api/makePayment/`,

    headers: {'Content-Type': 'application/json'},

    data: bodyFormData,
  });
  console.log(response.data);
  return response;
};

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

export default {
  makePayment,
  paymentAmount,
  paymentDate,
  paymentDateBack,
  paymentMethodBack,
  paymentMethod,
  saveBill,
};
