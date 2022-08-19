//基础信息 维护
import Fetch from '@/libs/axios'
import {
	ILineQuery,
	ILineSubmitInfo,
	DeleteLine,
} from '@/entity/maintenance/line'

/**
 * @description 分页查询
 * @param data
 * @interface ILineQuery
 */
export const getPageListReq = (data: ILineQuery) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/line/getpagelist',
		method: 'post',
		data,
	})
}

/**
 * @description 新增
 * @param data
 * @type ILineSubmitInfo
 */
export const addReq = (data: ILineSubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/line/addline',
		method: 'post',
		data,
	})
}
/**
 * @description 更新
 * @param data
 * @type ILineSubmitInfo
 */
export const updateReq = (data: ILineSubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/line/modifyline',
		method: 'put',
		data,
	})
}

/**
 * @description 删除
 * @param data
 * @type DeleteLine
 */
export const deteteReq = (data: DeleteLine) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/line/deleteLine',
		method: 'delete',
		data,
	})
}
