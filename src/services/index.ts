import { request } from 'umi';

export const Test = () => {
  return request('/api2/service/AuthService/login');
};
