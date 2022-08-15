//基础信息 维护
import Fetch from '@/libs/axios'
import {
	IEqpInfoQuery,
	IEqpInfoSubmitInfo,
	DeleteEqpInfo,
} from '@/entity/maintenance/eqpInfo'

/**
 * @description 分页查询
 * @param data
 * @interface IEqpInfoQuery
 */
export const getPageListReq = (data: IEqpInfoQuery) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/eqpinfo/getpagelist',
		method: 'post',
		data,
	})
}

/**
 * @description 新增
 * @param data
 * @type IEqpInfoSubmitInfo
 */
export const addReq = (data: IEqpInfoSubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/eqpinfo/addeqpinfo',
		method: 'post',
		data,
	})
}
/**
 * @description 更新
 * @param data
 * @type IEqpInfoSubmitInfo
 */
export const updateReq = (data: IEqpInfoSubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/eqpinfo/modifyeqpinfo',
		method: 'put',
		data,
	})
}

/**
 * @description 删除
 * @param data
 * @type DeleteEqpInfo
 */
export const deteteReq = (data: DeleteEqpInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/eqpinfo/deleteeqpinfo',
		method: 'delete',
		data,
	})
}
