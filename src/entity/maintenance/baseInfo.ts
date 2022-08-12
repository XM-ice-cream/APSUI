// BaseInfo 基础信息维护
import { IPagination, IBaseEntity } from '@/entity/common'

// 分页查询
export interface IBaseInfoQuery extends IPagination {
	data: {
		modelId: string
		workOrder: string
	}
}

// 新增、修改
export interface IUpdateBaseInfo extends IBaseEntity {
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
