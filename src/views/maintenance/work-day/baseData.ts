// 表格列
export const Column = [
	{
		key: 'startDateTime',
		title: '开始时间',
		minWidth: '200',
		align: 'center',
		tooltip: true,
        formatter: 'dateFormat',
	},
	{
		key: 'endDateTime',
		title: '结束时间',
		minWidth: '200',
		align: 'center',
		tooltip: true,
        formatter: 'dateFormat',
	},
	{
		key: 'dayByHours',
		title: '一天计算几小时',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'weekByDay',
		title: '一周计算几天',
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
        isTag:true,
        type:['','danger']
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
		prop: 'startDateTime',
		type: 'datePicker',
	},
	{
		label: '结束时间',
		prop: 'endDateTime',
		type: 'datePicker',
	}
]

// 新增、删除参数
export const UpdateForm = [
	{
		label: '开始时间',
		prop: 'startDateTime',
		type: 'datePicker',
	},
	{
		label: '结束时间',
		prop: 'endDateTime',
		type: 'datePicker',
	},
	{
		label: '一天计算几小时',
		prop: 'dayByHours',
		type: 'inputNumber',
	},
	{
		label: '一周计算几天',
		prop: 'weekByDay',
		type: 'inputNumber',
	},
	{
		label: '状态',
		prop: 'status',
		type: 'switch',
       
	}
]
