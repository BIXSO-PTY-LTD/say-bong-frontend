import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ASSETS_API, HOST_API } from '#/config-global';
import { getStorage } from '#/hooks/use-local-storage';

const axiosHostInstance: AxiosInstance = axios.create({ baseURL: HOST_API });


const responseInterceptor = (error: any) => Promise.reject((error.response && error.response.data) || 'Something went wrong');

axiosHostInstance.interceptors.response.use((res) => res, responseInterceptor);

export const axiosHost: AxiosInstance = axiosHostInstance;

export const hostFetcher = async (args: string | [string, AxiosRequestConfig]) => {

  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosHostInstance.get(url, { ...config });

  return res.data.data;
};


export const endpoints = {
  auth: {
    me: '/api/v1/me',
    login: '/api/v1/login',
    register: '/api/v1/register',
    changePassword: '/api/v1/change-password',
    logout: '/api/v1/logout',
    refreshToken: '/api/v1/refresh-token',
  },
  user: {
    list: '/api/v1/user',
  },
  news: '/api/v1/new-feed',

  excitingVideo: '/api/v1/interesting-shots',

  highlightVideo: '/api/v1/highlight',

  file: {
    upload: '/api/v1/upload/base64'
  },
  livestream: '/api/v1/livestream',
  upload: '/api/v1/upload'
};
