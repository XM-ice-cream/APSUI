//制程段明细 信息 维护
import Fetch from '@/libs/axios'
import { ISubmitInfo, ISearchInfo } from '@/entity/maintenance/processDetail'
import { IPagination } from '@/entity/common'

/**
 * @description 分页查询
 * @param data
 * @interface IPagination<ISearchInfo>
 */
export const getPageListReq = (data: IPagination<ISearchInfo>) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/processdetail/getpagelist',
		method: 'post',
		data,
	})
}

/**
 * @description 新增
 * @param data
 * @interface ISubmitInfo
 */
export const addReq = (data: ISubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/processdetail/addprocessdetail',
		method: 'post',
		data,
	})
}
/**
 * @description 更新
 * @param data
 * @interface ISubmitInfo
 */
export const updateReq = (data: ISubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/processdetail/modifyprocessdetail',
		method: 'put',
		data,
	})
}

/**
 * @description 删除
 * @param data
 * @interface ISubmitInfo
 */
export const deteteReq = (data: ISubmitInfo) => {
	return Fetch({
		baseUrl: 'http://10.32.44.91:8080',
		url: '/api/apscenter/v1/processdetail/deleteprocessdetail',
		method: 'delete',
		data,
	})
}
