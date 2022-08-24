// 工作日 明细 基础信息维护
import { IBaseEntity, IPageTable } from '@/entity/common'
//查询条件
export interface ISearchReq extends ISearchInfo, IPageTable {}

//查询参数
export interface ISearchInfo extends IBaseInfo {
}

// 新增、修改、删除
export interface ISubmitInfo extends IBaseInfo, IBaseEntity {}

export interface IBaseInfo {
    startDateTime?: string,
    endDateTime?: string,
    dayByHours?: number,
    weekByDay?: number,
    status?: string
}
