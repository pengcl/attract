export const followDto = {
	pid: {
		required: true,
		value: '',
		label: '业务id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	customerName: {
		required: true,
		value: '',
		label: '客户名',
		valid: false,
		validates: null,
		type: 'input',
		readonly: true
	},
	sources: {
		required: true,
		value: '',
		label: '客户来源',
		valid: false,
		validates: null,
		type: 'multiSelector',
		target: 'af74c4ca1a2840d09ca77b4a2625317d',
		options: [[], []],
		targets: ['sourceType', 'sourceSubtype'],
		notPost: true,
		readonly: true
	},
	sourceType: {
		required: true,
		value: '',
		label: '客户来源',
		valid: false,
		validates: null,
		type: 'hidden',
		notPost: true
	},
	sourceSubtype: {
		required: true,
		value: '0',
		label: '来源小类',
		valid: false,
		validates: null,
		type: 'hidden',
		notPost: true
	},
	level: {
		required: true,
		value: '',
		label: '客户等级',
		valid: false,
		validates: null,
		type: 'chips',
		target: '22e6325e882411eea75100163e127ceb',
		options: []
	},
	status: {
		required: true,
		value: '',
		label: '招商进度',
		valid: false,
		validates: null,
		type: 'select',
		target: '40d09ef163ab4ca5a9b0665d34b4750f',
		options: []
	},
	followWay: {
		required: true,
		value: '',
		label: '跟进方式',
		valid: false,
		validates: null,
		type: 'select',
		target: 'f9db1fe379754733bdef3c7da42a34ab',
		options: []
	},
	followTime: {
		required: true,
		value: '',
		label: '跟进时间',
		valid: false,
		validates: null,
		type: 'date'
	},
	contactsTime: {
		required: true,
		value: '',
		label: '下次联系时间',
		valid: false,
		validates: null,
		type: 'date'
	},
	customerType: {
		required: true,
		value: '',
		label: '客户类型',
		valid: false,
		validates: null,
		type: 'hidden',
	},
	followContent: {
		required: true,
		value: '',
		label: '跟进内容',
		valid: false,
		validates: null,
		type: 'textarea'
	},
	userId: {
		required: false,
		value: '',
		label: '归属人id',
		valid: false,
		validates: null,
		type: 'hidden'
	}
};

export const inputDto = {
	follow: followDto
}