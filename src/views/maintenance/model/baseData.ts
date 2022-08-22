// 表格列
export const Column = [
	{
		key: 'modelName',
		title: '机种',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'modelCode',
		title: '机种Code',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'adhesiveFilm',
		title: '胶膜',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'firstPiece',
		title: '首件',
		minWidth: '100',
		align: 'center',
		tooltip: true,
	},
	{
		key: 'changeLine',
		title: '换线',
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
		label: '机种',
		prop: 'modelName',
		type: 'input',
	},
]
// 新增、删除参数
export const UpdateForm = [
	{
		label: '机种名称',
		prop: 'modelName',
		type: 'input',
	},
	{
		label: '机种Code',
		prop: 'modelCode',
		type: 'input',
	},
	{
		label: '胶膜',
		prop: 'adhesiveFilm',
		type: 'input',
	},
	{
		label: '首件',
		prop: 'firstPiece',
		type: 'input',
	},
	{
		label: '换线',
		prop: 'changeLine',
		type: 'input',
	},
]
