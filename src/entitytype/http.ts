// http参数 类型
import  {  AxiosRequestConfig } from "axios";

// axios 拦截器 config 类型
export interface IConfigType extends AxiosRequestConfig  {
    reqType?:string,
    baseUrl?:string,
}

// 返回值状态
export interface IStatusType{
    [key: string ]: string;
}



