export const clueTabs = [
	{
		label: '录跟进',
		code: 'follow',
		icon: '/static/tabbar/clue/follow-gray.png',
		selectedIcon: '/static/tabbar/clue/follow.png'
	},
	{
		label: '编辑',
		code: 'edit',
		icon: '/static/tabbar/clue/edit-gray.png',
		selectedIcon: '/static/tabbar/clue/edit.png'
	},
	{
		label: '放公池',
		code: 'in',
		icon: '/static/tabbar/clue/in-gray.png',
		selectedIcon: '/static/tabbar/clue/in.png'
	},
	{
		label: '转客户',
		code: 'out',
		icon: '/static/tabbar/clue/out.png',
		selectedIcon: '/static/tabbar/clue/out.png'
	},
	{
		label: '更多',
		code: 'more',
		icon: '/static/tabbar/clue/more-gray.png',
		selectedIcon: '/static/tabbar/clue/more.png'
	}
]

export const leadsDto = {
	customerName: {
		required: true,
		value: '',
		label: '客户名',
		valid: false,
		validates: null,
		type: 'input'
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
	phone: {
		required: false,
		value: '',
		label: '电话',
		valid: false,
		validates: null,
		type: 'input'
	},
	optionalPhone: {
		required: false,
		value: '',
		label: '备选电话',
		valid: false,
		validates: null,
		type: 'input'
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
	customerType: {
		required: true,
		value: false,
		label: '是否是企业客户',
		valid: false,
		validates: null,
		type: 'switch'
	},
	nextFollowTime: {
		required: false,
		value: '',
		label: '下次跟进时间',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	teamId: {
		required: false,
		value: '',
		label: '团队id',
		valid: false,
		validates: null,
		type: 'hidden'
	}
};
export const leadsIntentionInfoDto = {
	id: {
		required: false,
		value: '',
		label: 'id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	project: {
		required: false,
		value: '',
		label: '意向项目',
		valid: false,
		validates: null,
		type: 'select',
		target: '69be161a-c3f6-4a9e-8b1a-86592cd0b189',
		options: []
	},
	area: {
		required: false,
		value: '',
		label: '意向面积',
		valid: false,
		validates: null,
		type: 'select',
		target: '4747a9da16bd4e358c3610c1286b92db',
		options: []
	},
	budget: {
		required: false,
		value: '',
		label: '租金预算',
		valid: false,
		validates: null,
		type: 'select',
		target: '9af9b785684147dea3317d7577cba37b',
		options: []
	},
	contrastProject: {
		required: false,
		value: '',
		label: '对比项目',
		valid: false,
		validates: null,
		type: 'hidden',
		target: 'b7690247f6d2443bb2f48978789a3a4d',
		options: []
	},
	factor: {
		required: false,
		value: '',
		label: '关注因素',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	floor: {
		required: false,
		value: '',
		label: '楼层编好',
		valid: false,
		validates: null,
		type: 'select',
		target: '78d40f02f00048a7bd0de5bc82d29b2f',
		options: []
	},
	intentionTime: {
		required: false,
		value: '',
		label: '意向承租时间',
		valid: false,
		validates: null,
		type: 'date'
	},
	leadsId: {
		required: true,
		value: '',
		label: 'id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	recommendType: {
		required: false,
		value: '',
		label: '推荐类型',
		valid: false,
		validates: null,
		type: 'hidden',
		target: 'd6806e8203c1405b8111e91b0ab8d77d',
		options: []
	},
	recommendUser: {
		required: false,
		value: '',
		label: '推荐方',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	resistance: {
		required: false,
		value: '',
		label: '成交抗性',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	tenancyEndTime: {
		required: false,
		value: '',
		label: '租期结束时间',
		valid: false,
		validates: null,
		type: 'hidden'
	}
};

export const enterpriseInfoDto = {
	id: {
		required: false,
		value: '',
		label: 'id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	address: {
		required: false,
		value: '',
		label: '地址',
		valid: false,
		validates: null,
		type: 'input'
	},
	bankCard: {
		required: false,
		value: '',
		label: '银行卡号',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	bankName: {
		required: false,
		value: '',
		label: '开户行名称',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	brand: {
		required: false,
		value: '',
		label: '品牌',
		valid: false,
		validates: null,
		type: 'select',
		target: '22fcb231882411eea75100163e127ceb',
		options: []
	},
	businessType: {
		required: false,
		value: '',
		label: '业态',
		valid: false,
		validates: null,
		type: 'select',
		target: '22fb1076882411eea75100163e127ceb',
		options: []
	},
	eleasingEnterpriseId: {
		required: false,
		value: '',
		label: 'eleasing企业id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	enterpriseDetailId: {
		required: false,
		value: '',
		label: '企业详情表id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	enterpriseType: {
		required: false,
		value: '',
		label: '公司类型',
		valid: false,
		validates: null,
		type: 'select',
		target: 'f207e9b437b04dcc97664a590c97664a',
		options: []
	},
	idNumber: {
		required: false,
		value: '',
		label: '证件号码',
		valid: false,
		validates: null,
		type: 'input'
	},
	idType: {
		required: false,
		value: '',
		label: '证件类型',
		valid: false,
		validates: null,
		type: 'select',
		target: '6d696972b1b746d2af5c61328c20a668',
		options: []
	},
	industry: {
		required: false,
		value: '',
		label: '行业',
		valid: false,
		validates: null,
		type: 'select',
		target: '70be3d0b65fc473d924a3d074300b78b',
		options: []
	},
	intermediary: {
		required: false,
		value: '',
		label: '所属中介',
		valid: false,
		validates: null,
		type: 'input'
	},
	legalPerson: {
		required: false,
		value: '',
		label: '法人',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	legalPersonIdNumber: {
		required: false,
		value: '',
		label: '法人证件号码',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	legalPersonIdType: {
		required: false,
		value: '',
		label: '法人证件类型',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	pid: {
		required: false,
		value: '',
		label: '业务 id',
		valid: false,
		validates: null,
		type: 'integer'
	},
	pidType: {
		required: false,
		value: '',
		label: '业务类型',
		valid: false,
		validates: null,
		type: 'select',
		target: '',
		options: [{ label: '1', value: '客户' }, { label: '2', value: '线索' }]
	},
	scale: {
		required: false,
		value: '',
		label: '企业规模',
		valid: false,
		validates: null,
		type: 'select',
		target: 'c15c32b04c2c486ba8726a5e4231ea16',
		options: []
	},
	site: {
		required: false,
		value: '',
		label: '公司网址',
		valid: false,
		validates: null,
		type: 'input'
	},
	updateTime: {
		required: false,
		value: '',
		label: '更新时间',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	updateUserId: {
		required: false,
		value: '',
		label: '更新人',
		valid: false,
		validates: null,
		type: 'hidden'
	}
}

export const contactsDto = {
	id: {
		required: false,
		value: '',
		label: 'id',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	pid: {
		required: false,
		value: '',
		label: 'pid',
		valid: false,
		validates: null,
		type: 'hidden'
	},
	pidType: {
		required: false,
		value: '',
		label: 'pid',
		valid: false,
		validates: null,
		type: 'hidden'
	},
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
	sourceType: {
		required: false,
		value: '',
		label: '联系人来源',
		valid: false,
		validates: null,
		type: 'select',
		target: '',
		options: [{ label: 1, value: '新赏家小程序' }, { label: 2, value: '手工录入' }]
	}

}

export const inputDto : any = {
	contacts: contactsDto,
	leads: leadsDto,
	enterpriseInfo: enterpriseInfoDto,
	leadsIntentionInfo: leadsIntentionInfoDto
}