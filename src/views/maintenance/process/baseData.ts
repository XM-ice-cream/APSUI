// 表格列
export const Column = [
	{
		key: 'processName',
		title: '制程段名称',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'processCode',
		title: '制程段Code',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'region',
		title: '段别',
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
		label: '制程段code',
		prop: 'processCode',
		type: 'input',
		labelWidth: '120px',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '制程段名称',
		prop: 'processName',
		type: 'input',
	},
	{
		label: '制程段Code',
		prop: 'processCode',
		type: 'input',
	},
	{
		label: '段别',
		prop: 'region',
		type: 'select',
        selectList:[
                    {label:"SMT", value:"SMT"},
                    {label:"BE", value:"BE"}, 
                    {label:"Encap", value:"Encap"}
                   ] 
	},
]
