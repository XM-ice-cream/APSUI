// 表格列
export const Column = [
	{
		key: 'lineCode',
		title: '线体Code',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'lineName',
		title: '线体名称',
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
		label: '线体Code',
		prop: 'lineCode',
		type: 'input',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '线体名称',
		prop: 'lineName',
		type: 'input',
	},
	{
		label: '线体Code',
		prop: 'lineCode',
		type: 'input',
	},
]
