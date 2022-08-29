// 表格列
export const Column = [
	{
		key: 'combinationName',
		title: '组合制程名称',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'processId',
		title: '制程段ID ',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'lindId',
		title: '线别',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'createDate',
		title: '创建时间',
		width: '200',
		align: 'center',
		tooltip: true,
		formatter: 'dateFormat',
	},
	{
		key: 'createUserName',
		title: '创建人',
		width: '100',
		align: 'center',
		tooltip: true,
	},
]
// 查询参数
export const SearchForm = [
	{
		label: '组合制程名称',
		prop: 'combinationName',
		type: 'input',
		labelWidth: '120px',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '组合制程名称',
		prop: 'combinationName',
		type: 'input',
	},
	{
		label: '制程段ID',
		prop: 'processId',
		type: 'input',
	},
	{
		label: '线别',
		prop: 'lindId',
		type: 'select',
        selectList:[]
	},
]
