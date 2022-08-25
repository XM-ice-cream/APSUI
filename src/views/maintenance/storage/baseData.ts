// 表格列
export const Column = [
	{
		key: 'po',
		title: '订单号',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'modelId',
		title: '机种 ',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'inStorageQty',
		title: '入库数量',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'workOrder',
		title: '工单',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'status',
		title: '状态',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'storageDateTime',
		title: '入库时间',
		minWidth: '200',
		align: 'center',
		tooltip: true,
		formatter: 'dateFormat',
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
		label: '开始时间',
		prop: 'storageStartDateTime',
		type: 'datePicker',
	},
	{
		label: '结束时间',
		prop: 'storageEndDateTime',
		type: 'datePicker',
	},
	{
		label: '订单号',
		prop: 'po',
		type: 'input',
	},
]
// 高级查询
export const AdvancedForm = [
	{
		label: '机种',
		prop: 'modelId',
		type: 'input',
	},
	{
		label: '工单',
		prop: 'workOrder',
		type: 'input',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '订单号',
		prop: 'po',
		type: 'input',
	},
	{
		label: '机种',
		prop: 'modelId',
		type: 'input',
	},
	{
		label: '入库数量',
		prop: 'inStorageQty',
		type: 'input',
	},
	{
		label: '工单',
		prop: 'workOrder',
		type: 'input',
	},
	{
		label: '状态',
		prop: 'status',
		type: 'radioGroup',
	},
	{
		label: '入库时间',
		prop: 'storageDateTime',
		type: 'datePicker',
	},
]
