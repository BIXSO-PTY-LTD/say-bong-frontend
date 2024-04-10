import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ASSETS_API, HOST_API } from '#/config-global';
import { getStorage } from '#/hooks/use-local-storage';

const axiosHostInstance: AxiosInstance = axios.create({ baseURL: HOST_API });
const axiosAssetsInstance: AxiosInstance = axios.create({ baseURL: ASSETS_API });


const responseInterceptor = (error: any) => Promise.reject((error.response && error.response.data) || 'Something went wrong');

axiosHostInstance.interceptors.response.use((res) => res, responseInterceptor);
axiosAssetsInstance.interceptors.response.use((res) => res, responseInterceptor);

export const axiosHost: AxiosInstance = axiosHostInstance;
export const axiosAssets: AxiosInstance = axiosAssetsInstance;

export const hostFetcher = async (args: string | [string, AxiosRequestConfig]) => {

  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosHostInstance.get(url, { ...config });

  return res.data.data;
};

export const assetsFetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosAssetsInstance.get(url, { ...config });

  return res.data;
};

export const endpoints = {
  chat: '/api/chat',
  auth: {
    me: '/api/v1/me',
    login: '/api/v1/login',
    register: '/api/v1/register',
    changePassword: '/api/v1/change-password',
    logout: '/api/v1/logout',
    refreshToken: '/api/v1/refresh-token',
  },
  user: {
    update: '/api/v1/user'
  },
  news: {
    list: '/api/v1/new-feed',
    create: '/api/v1/new-feed'
  }
};
