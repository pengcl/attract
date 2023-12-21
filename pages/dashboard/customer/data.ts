export const clueTabs = [
	{
		label: '编辑',
		code: 'edit',
		icon: '/static/tabbar/clue/edit-gray.png',
		selectedIcon: '/static/tabbar/clue/edit.png'
	},
	{
		label: '删除',
		code: 'delete',
		icon: '/static/tabbar/clue/in-gray.png',
		selectedIcon: '/static/tabbar/clue/in.png'
	},
	{
		label: '更多',
		code: 'more',
		icon: '/static/tabbar/clue/more-gray.png',
		selectedIcon: '/static/tabbar/clue/more.png'
	}
]

export const customerDto = {
	userName: {
		required: true,
		value: '',
		label: '联系人姓名',
		valid: false,
		validates: null,
		type: 'input'
	},
	gender: {
		required: false,
		value: '',
		label: '性别',
		valid: false,
		validates: null,
		type: 'select',
		target: '',
		options: [{ label: '1', value: '男' }, { label: '2', value: '女' }]
	},
	sources: {
		required: true,
		value: '',
		label: '来源',
		valid: false,
		validates: null,
		type: 'multiSelector',
		target: 'af74c4ca1a2840d09ca77b4a2625317d',
		options: [[], []],
		targets: ['sourceType', 'sourceSubtype'],
		notPost: true
	},
	sourceType: {
		required: true,
		value: '',
		label: '客户来源',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	sourceSubtype: {
		required: true,
		value: '0',
		label: '来源小类',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	sourceDetail: {
		required: false,
		value: '',
		label: '来源详情',
		valid: false,
		validates: null,
		type: 'hidden',
	},
	phone: {
		required: false,
		value: '',
		label: '电话',
		valid: false,
		validates: null,
		type: 'input'
	},
	alternatePhone: {
		required: false,
		value: '',
		label: '备选电话',
		valid: false,
		validates: null,
		type: 'input'
	},
	mail: {
		required: false,
		value: '',
		label: '邮箱',
		valid: false,
		validates: null,
		type: 'input'
	},
	post: {
		required: false,
		value: '',
		label: '职位',
		valid: false,
		validates: null,
		type: 'input'
	},
	pid: {
		required: false,
		value: '',
		label: '业务 id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	pidType: {
		required: true,
		value: '',
		label: '',
		valid: false,
		validates: null,
		type: 'select',
		target: '',
		options: [{ label: '1', value: '关联客户' }, { label: '2', value: '关联线索' }]
	},
	createType: {
		required: true,
		value: '0',
		label: '创建类型',
		valid: true,
		validates: null,
		type: 'hidden'
	},
}