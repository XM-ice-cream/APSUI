import Fetch from '@/libs/axios'
import { IUserLoginReq } from '@/entity/user'

import router from '../router/index'

/**
 * @description 用户登录
 * @param data
 * @interface IUserLoginReq
 */
export const userLoginApi = (data: IUserLoginReq) => {
	return Fetch({
		reqType: 'FormData',
		url: '/connect/token',
		method: 'post',
		data,
	})
}

/**
 * @description 获取用户列表
 */
export const getUserListApi = () => {
	return Fetch({
		url: '/api/usercenter/v1/user/getcurrentuser',
		method: 'post',
	}).catch((err: string) => {
		throw err
	})
}

/**
 * @description 获取用户菜单
 * @param
 */
export const getUserMenu = () => {
	return Fetch({
		url: '/api/usercenter/v1/menubutton/getlisttreecurrentuser',
		method: 'post',
	}).catch((err: string) => {
		localStorage.clear()
		router.replace('/login')
	})
}
