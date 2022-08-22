// 表格列
export const Column = [
	{
		key: 'processId',
		title: '制程段ID',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'eqpId',
		title: '设备ID',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'qty',
		title: '数量',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'idx',
		title: '排序',
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
		label: '设备ID',
		prop: 'eqpId',
		type: 'input',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '制程段ID',
		prop: 'processId',
		type: 'input',
	},
	{
		label: '设备ID',
		prop: 'eqpId',
		type: 'input',
	},
	{
		label: '数量',
		prop: 'qty',
		type: 'inputNumber',
	},
	{
		label: '排序',
		prop: 'idx',
		type: 'inputNumber',
	},
]
