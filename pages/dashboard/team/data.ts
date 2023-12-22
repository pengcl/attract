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

export const teamDto = {
	level: {
		required: true,
		value: '',
		label: '团队层级',
		valid: false,
		validates: null,
		type: 'input'
	},
	name: {
		required: false,
		value: '',
		label: '团队名称',
		valid: false,
		validates: null,
		type: 'input',
	},
	projectId: {
		required: false,
		value: '',
		label: '项目id',
		valid: false,
		validates: null,
		type: 'hidden',
		target: '69be161a-c3f6-4a9e-8b1a-86592cd0b189',
		options: [],
	},
	seq: {
		required: true,
		value: '',
		label: '排序',
		valid: false,
		validates: null,
		type: 'input',
		placeholder: '数字大的排序靠前'
	},
	teamParentId: {
		required: true,
		value: '0',
		label: '上级团队',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	teamParentRouteId: {
		required: true,
		value: '',
		label: '来源详情',
		valid: false,
		validates: null,
		type: 'hidden',
	}
}