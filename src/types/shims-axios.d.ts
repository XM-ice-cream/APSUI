import { AxiosRequestConfig } from 'axios'
import { IConfigType } from '../entity/http'
/**
 * 自定义扩展axios模块
 *
 */
declare module 'axios' {
	export interface AxiosInstance {
		<T = any>(config: IConfigType): Promise<T>
		request<T = any>(config: IConfigType): Promise<T>
		get<T = any>(url: string, config?: IConfigType): Promise<T>
		delete<T = any>(url: string, config?: IConfigType): Promise<T>
		head<T = any>(url: string, config?: IConfigType): Promise<T>
		post<T = any>(url: string, data?: any, config?: IConfigType): Promise<T>
		put<T = any>(url: string, data?: any, config?: IConfigType): Promise<T>
		patch<T = any>(
			url: string,
			data?: any,
			config?: IConfigType
		): Promise<T>
	}
}
