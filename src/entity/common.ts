// 公共实体类
export interface IPagination {
	orderField: string //排序字段
	ascending: Boolean // 是否升序
	pageSize: number // 分页大小
	pageIndex: number // 当前页码
	total?: number //总条数
	data: any //查询条件
}

export interface IBaseEntity {
	id?: string
	createDate?: string
	createUserName?: string
}

//API 返回结果
export interface IRes {
	code: number
	errorCode: number
	hasPage: Boolean
	message: string
	elapsedMilliseconds: number
	result: any
}
// 基础增删改查
export interface IFormBase {
	label: string
	prop: string
	pleaseholder: string
	type: string
}
//请求参数
export interface IReq {
	orderField: string
	ascending: Boolean
	pageSize: number
	pageIndex: number
	total: number
	totalPage: number
	elapsedMilliseconds: number
}

export interface ITableBase {
	key: string
	title: string
	align: string
	tooltip: Boolean
	width?: string
	minWidth?: string
	formatter?: string
}
