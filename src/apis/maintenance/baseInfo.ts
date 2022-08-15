//基础信息 维护
import Fetch from '@/libs/axios'
import {
	IBaseInfoQuery,
	IBaseInfoSubmitInfo,
	DeleteBaseInfo,
} from '@/entity/maintenance/baseInfo'

/**
 * @description 分页查询
 * @param data
 * @interface IBaseInfoQuery
 */
export const getPageListReq = (data: IBaseInfoQuery) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/anonymous/v1/baseinfo/getpagelist',
		method: 'post',
		data,
	})
}

/**
 * @description 新增
 * @param data
 * @type IBaseInfoSubmitInfo
 */
export const addReq = (data: IBaseInfoSubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/anonymous/v1/baseinfo/addbaseinfo',
		method: 'post',
		data,
	})
}
/**
 * @description 更新
 * @param data
 * @type IBaseInfoSubmitInfo
 */
export const updateReq = (data: IBaseInfoSubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/anonymous/v1/baseinfo/modifybaseinfo',
		method: 'put',
		data,
	})
}

/**
 * @description 删除
 * @param data
 * @type DeleteBaseInfo
 */
export const deteteReq = (data: DeleteBaseInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/anonymous/v1/baseinfo/deletebaseinfo',
		method: 'delete',
		data,
	})
}
