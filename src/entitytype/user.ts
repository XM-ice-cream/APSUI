// 用户信息

export interface IUserLoginReq {
    password: string;
    username: string
}

export interface IUserLoginRes {
    access_token: string;
    refresh_token: string;
}

export interface IGetUserListItem {
    account: string
    companyIds: string
    createDate: string | null
    createUserId: string | null
    createUserName: string | null
    departmentIds: string
    email: string
    enabled: number
    headIcon: string
    id: string
    isAdministrator: Boolean
    lastPasswordChangeTime: string
    modifyDate: string | null
    modifyUserId: string | null
    modifyUserName: string | null
    name: string
    needChangePassword: Boolean
    password: string
    phone: string | null
    remark: string | null
    roleIds: string
    simpleSpelling: string | null
    sortCode:number | null
    source: number
    systemFlag: string
    vipLevel: number
}