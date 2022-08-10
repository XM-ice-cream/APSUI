//基础信息 维护
import Fetch from "@/libs/axios";
import {IBaseInfoQuery,UpdateBaseInfo,DeleteBaseInfo} from "@/entitytype/maintenance/baseInfo"
import {IRes} from "@/entitytype/common"

/**
 * @description 分页查询
 * @param data 
 * @interface IBaseInfoQuery
 */
 export const getPageListReq = (data: IBaseInfoQuery) => {
    return Fetch({
        baseUrl:"http://10.32.44.91:8080",
        url: '/api/apscenter/anonymous/v1/baseinfo/getpagelist',
        method: 'post',
        data
    })
};


/**
 * @description 新增
 * @param data 
 * @type UpdateBaseInfo
 */
 export const addReq = (data: UpdateBaseInfo) => {
    return Fetch({
        baseUrl:"http://10.32.44.91:8080",
        url: '/api/apscenter/anonymous/v1/baseinfo/addbaseinfo',
        method: 'post',
        data
    })
};
/**
 * @description 更新
 * @param data 
 * @type UpdateBaseInfo
 */
 export const updateReq = (data: UpdateBaseInfo) => {
    return Fetch({
        baseUrl:"http://10.32.44.91:8080",
        url: '/api/apscenter/anonymous/v1/baseinfo/modifybaseinfo',
        method: 'put',
        data
    })
};

/**
 * @description 删除
 * @param data 
 * @type DeleteBaseInfo
 */
 export const deteteReq = (data:DeleteBaseInfo ) => {
    return Fetch({
        baseUrl:"http://10.32.44.91:8080",
        url: '/api/apscenter/anonymous/v1/baseinfo/deletebaseinfo',
        method: 'delete',
        data
    })
};