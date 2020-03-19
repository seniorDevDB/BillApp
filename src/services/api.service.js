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
  console.log("fdsafdasfdsafds");
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

export default {
  makePayment,
  paymentAmount,
  paymentDate,
  paymentDateBack,
};
