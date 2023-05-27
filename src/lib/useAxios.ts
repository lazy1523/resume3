import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useLoading } from "@/store/globalState";

type HttpMethod = 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';

function handleError(error: any) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                return {
                    title: '请求错误',
                    description: '服务器无法理解请求语义.'
                };
            case 401:
                return {
                    title: '未授权',
                    description: '需要身份验证，登录可能已过期.'
                };
            case 404:
                return {
                    title: '资源未找到',
                    description: '服务器找不到请求的资源.'
                };
            case 500:
                return {
                    title: '服务器错误',
                    description: '服务器遇到错误，无法完成请求.'
                };
            default:
                return {
                    title: '未知错误',
                    description: error.message
                };
        }
    } else if (error.request) {
        return {
            title: '请求超时',
            description: '服务器没有响应，可能是网络问题或服务器出错.'
        };
    } else {
        return {
            title: '请求错误',
            description: error.message
        };
    }
}


const useAxios = () => {
    const { toast } = useToast();
    const setLoadingVisible = useLoading();


    // 创建axios实例
    const instance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL :  process.env.NEXT_PUBLIC_API_DEV_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
        }
    });

    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
        setLoadingVisible(true);
        const storedUserData:any = localStorage.getItem('user');
        if (storedUserData?.expiresAt) {
            const currentTime = new Date().getTime();
            const expiresAt = new Date(storedUserData.expiresAt).getTime();
        
            if (currentTime > expiresAt) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                toast({
                    title: '登录过期',
                    description:"登录过期，请重新登录",
                    variant: "destructive",
                    duration: 1500
                });
                if (typeof window !== 'undefined') {
                    window.location.href = '/auth/login';
                }
            }
        }
        

        return config;
    }, function (error) {
        setLoadingVisible(false);
        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
        setLoadingVisible(false);
        return response;
    }, function (error) {
        setLoadingVisible(false);
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                // 清除本地存储中的token并跳转到登录页面
                localStorage.removeItem('token');
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    });

    const http = async <T = any>(method: HttpMethod, url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        const startTime = Date.now();
        return instance[method](url, data, config)
            .then((response: AxiosResponse<T>) => {
                const requestTime = (Date.now() - startTime) / 1000;
                toast({
                    title: '请求成功',
                    description: `请求成功，用时${requestTime}秒.`,
                    duration: 1500,
                });
                return response;
            })
            .catch((error) => {
                const { title, description } = handleError(error);
                toast({
                    title,
                    description,
                    variant: "destructive",
                    duration: 1500
                });
                console.error(error)
                return error;
            });
    }

    const get = <T = any>(url: string, config?: AxiosRequestConfig) => http<T>('get', url, undefined, config);
    const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => http<T>('post', url, data, config);
    const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => http<T>('put', url, data, config);
    const del = <T = any>(url: string, config?: AxiosRequestConfig) => http<T>('delete', url, undefined, config);
    const patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => http<T>('patch', url, data, config);
    const head = <T = any>(url: string, config?: AxiosRequestConfig) => http<T>('head', url, undefined, config);
    const options = <T = any>(url: string, config?: AxiosRequestConfig) => http<T>('options', url, undefined, config);
    const all = <T = any>(requests: Array<Promise<T> | T>) => axios.all(requests);

    return { get, post, put, del, patch, head, options, all };
};

export default useAxios;
