// 物料 基础信息维护
import { IBaseEntity, IPageTable } from '@/entity/common'
//查询条件
export interface ISearchReq extends ISearchInfo, IPageTable {}

//查询参数
export interface ISearchInfo extends IBaseInfo {
	storageStartDateTime: string
	storageEndDateTime: string
}

// 新增、修改、删除
export interface ISubmitInfo extends IBaseInfo, IBaseEntity {}

export interface IBaseInfo {
	po?: string
	modelId?: string
	workOrder?: string
	marstPartId?: string
	inStorageQty?: number
	storageDateTime?: string
	marstPartY?: string
	levelPart?: string
	status?: string
}
