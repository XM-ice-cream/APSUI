//全局常量
export default {
	// 分页每页条数切换的配置
	pageSizeList: [5, 30, 50, 100],
	// 分页配置
	pageConfig: {
		elapsedMilliseconds: null, //耗时
		pageSize: 30, // 每页显示数
		pageIndex: 1, // 当前页
		orderField: 'CREATEDATE', // 排序字段
		ascending: false, // 排序类型true升序 false降序
		total: 0, //  总条数
		totalPage: 0, //  总页数
	},
	// 全局表格配置
	tableConfig: {
		border: false, //全局表格边框是否展示
		highlightRow: true, //全局表格高亮是否开启
		loading: true, //全局表格加载是否开启
		height: 200, //全局表格初始高度
	},
}
