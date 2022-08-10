// BaseInfo 基础信息维护
import {IPagination,IRes} from "@/entitytype/common"

// 分页查询
export interface IBaseInfoQuery extends IPagination {
  data:{
    modelId:string,
    workOrder:string
  }
}

// 新增、修改
export type UpdateBaseInfo = {   
    modelId:string,
    workOrder:string,
    processLineId:string,
    uph:number,
    workDayId:string,
    seq:number,
    priority:number,
    id?:string
}
// 删除
export type DeleteBaseInfo = {   
    id:string,
}
// 查询 返回结果
export interface IBaseInfoRes extends IRes {
   result:baseInfoRes
}

interface baseInfoRes extends IPagination {
    data:Array<BaseInfo>
}

export type BaseInfo = {     
    id?:string, 
    modelId?:string,
    workOrder?:string,
    processLineId?:string,
    uph?:number,
    workDayId?:string,
    seq?:number,
    priority?:number,
    createDate?:string,
    createUserName?:string
}





