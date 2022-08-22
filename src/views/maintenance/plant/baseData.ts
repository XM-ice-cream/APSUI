// 表格列
export const Column = [
	{
		key: 'plant',
		title: '厂区',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'plantCode',
		title: '厂区Code',
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
		label: '厂区Code',
		prop: 'plantCode',
		type: 'input',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '厂区',
		prop: 'plant',
		type: 'input',
	},
	{
		label: '厂区Code',
		prop: 'plantCode',
		type: 'input',
	},
]
