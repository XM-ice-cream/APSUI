// EqpInfo 基础信息维护
import { IPagination, IBaseEntity, IReq } from '@/entity/common'

// 分页查询
export interface IEqpInfoQuery extends IPagination {
	data: {
		eqpCode: string
	}
}
//查询 IReq为分页参数
export interface IEqpInfoReq extends IReq {
	eqpCode: string
}

// 新增、修改
export interface IEqpInfoSubmitInfo extends IBaseEntity {
	eqpCode: string
	eqpName: string
	location: string
	qty: number
}
// 删除
export type DeleteEqpInfo = {
	id: string
}
