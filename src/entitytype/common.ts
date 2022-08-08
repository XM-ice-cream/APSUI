// 公共实体类
export interface IPagination{
    orderField:string, //排序字段
    ascending:Boolean,// 是否升序
    pageSize:number,// 分页大小
    pageIndex:number,// 当前页码
    total?:number,//总条数
    data:any,//查询条件
}

//API 返回结果
export interface IRes{
    code:number,
    errorCode:number,
    hasPage:Boolean,
    message:string,
    elapsedMilliseconds:number,
    result:any
}