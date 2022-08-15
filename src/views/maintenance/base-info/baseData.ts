// 表格列
export const Column = [
	{
		key: 'modelId',
		title: '机种',
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
		key: 'processLineId',
		title: '制程段ID',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'workDayId',
		title: '工作排程时间ID',
		minWidth: '150',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'uph',
		title: '最大产能',
		width: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'seq',
		title: '排序',
		width: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'priority',
		title: '优先级',
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
		label: '机种ID',
		prop: 'modelId',
		type: 'input',
	},
	{
		label: '工单',
		prop: 'workOrder',
		type: 'input',
	},
	{
		label: '制程段ID',
		prop: 'processLineId',
		type: 'input',
	},
	{
		label: '最大产能',
		prop: 'uph',
		type: 'inputNumber',
	},
	{
		label: '工作排程时间ID',
		prop: 'workDayId',
		type: 'input',
	},
	{
		label: '排序',
		prop: 'seq',
		type: 'inputNumber',
	},
	{
		label: '优先级',
		prop: 'priority',
		type: 'inputNumber',
	},
]
