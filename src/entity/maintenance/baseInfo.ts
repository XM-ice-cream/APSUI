// BaseInfo 基础信息维护
import { IPagination, IBaseEntity, IReq } from '@/entity/common'

// 分页查询
export interface IBaseInfoQuery extends IPagination {
	data: {
		modelId: string
		workOrder: string
	}
}
//查询 IReq为分页参数
export interface IBaseInfoReq extends IReq {
	modelId: string
	workOrder: string
}

// 新增、修改
export interface IBaseInfoSubmitInfo extends IBaseEntity {
	modelId: string
	workOrder: string
	processLineId: string
	uph: number
	workDayId: string
	seq: number
	priority: number
}
// 删除
export type DeleteBaseInfo = {
	id: string
}
