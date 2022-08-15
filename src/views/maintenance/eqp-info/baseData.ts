// 表格列
export const Column = [
	{
		key: 'eqpCode',
		title: '设备编码',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'eqpName',
		title: '设备名称',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'location',
		title: '位置',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'qty',
		title: '数量',
		width: '100',
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
		label: '设备编码',
		prop: 'eqpCode',
		type: 'input',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '设备编码',
		prop: 'eqpCode',
		type: 'input',
	},
	{
		label: '设备名称',
		prop: 'eqpName',
		type: 'input',
	},
	{
		label: '位置',
		prop: 'location',
		type: 'input',
	},
	{
		label: '数量',
		prop: 'qty',
		type: 'inputNumber',
	},
]
