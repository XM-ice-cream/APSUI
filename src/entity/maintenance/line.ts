// Line 基础信息维护
import { IPagination, IBaseEntity, IReq } from '@/entity/common'

// 分页查询
export interface ILineQuery extends IPagination {
	data: {
		lineCode: string
	}
}
//查询 IReq为分页参数
export interface ILineReq extends IReq {
	lineCode: string
}

// 新增、修改
export interface ILineSubmitInfo extends IBaseEntity {
	lineCode: string
	lineName: string
}
// 删除
export type DeleteLine = {
	id: string
}
