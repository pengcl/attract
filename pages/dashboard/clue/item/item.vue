<template>
	<view v-if="data" class="page page-has_title">
		<page-profile :profile="'1'" ref='profile'></page-profile>
		<view class="info-wrap" :class="this.fixed ? 'fixed' : ''">
			<view class="info-tabs-placeholder"></view>
			<view class="info-tabs">
				<view class="uni-flex uni-row">
					<view @click="tabChange(0)" class="flex-item" :class="tab === 0 ? 'curr' : ''">
						<view class="filter-item">
							线索记录
						</view>
					</view>
					<view class="flex-item" :class="tab === 1 ? 'curr' : ''">
						<view @click="tabChange(1)" class="filter-item">
							线索详情
						</view>
					</view>
					<view @click="tabChange(2)" class="flex-item" :class="tab === 2 ? 'curr' : ''">
						<view class="filter-item">
							相关信息
						</view>
					</view>
				</view>
			</view>
			<view class="records tab-content" v-if="tab === 0">
				<template v-for="(item,index) in data.records">
					<view class="list-header">{{item.id}}</view>
					<uni-list class="list-items">
						<uni-list-item class="list-item" v-for="(sub,index) in item.items" clickable @click="link(item)"
							:key="index">
							<template v-slot:header>
								<view class="list-item-header">
									<view class="timeline">{{sub.time}}</view>
								</view>
							</template>
							<template v-slot:body>
								<view class="list-item-body">
									<view class="title">{{sub.name}}</view>
									<view class="desc">
										<view>{{sub.content}}</view>
										<view class="thumbs">
											<image v-for="(thumb,i) in sub.images" :src="thumb" :key="i"></image>
										</view>
										<view>跟进人：{{sub.follow_by}}</view>
									</view>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
				</template>
			</view>
			<view class="tab-content" v-if="tab === 1">
				<template>
					<uni-list class="keyvalues" :border="false">
						<uni-list-item :border="false" note="名称" :rightText="data.details.customerName" />
						<uni-list-item :border="false" note="来源" :rightText="map.sourceType.options[data.details.sourceType] ? map.sourceType.options[data.details.sourceType] : '无'" />
						<uni-list-item :border="false" note="电话" :rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="下次联系时间" rightText="右侧文字" />
					</uni-list>
					<uni-list class="keyvalues" :border="false">
						<uni-list-item :border="false" note="归属人" :rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="创建人" :rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="创建时间" :rightText="data.details.createTime ? data.details.createTime : '无'" />
						<uni-list-item :border="false" note="最近修改时间" :rightText="data.details.updateTime ? data.details.updateTime : '无'" />
						<uni-list-item :border="false" note="最近修改人" :rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="最近跟进时间" :rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="最近跟进人" :rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="前归属人" :rightText="data.details.phone ? data.details.phone : '无'" />
					</uni-list>
				</template>
			</view>
			<view class="tab-content" v-if="tab === 2">
				<view class="panel">
					<view class="panel-hd">联系人</view>
					<view class="panel-bd">
						<uni-list class="list-items">
							<uni-list-item class="list-item">
								<template v-slot:body>
									<view class="list-item-body">
										<view class="title">王总 <view class="tags">
												<view class="tag">法人</view>
											</view>
										</view>
										<view class="desc">13800138000</view>
									</view>
								</template>
								<template v-slot:footer>
									<view class="list-item-footer">
										<image class="image" src="/static/icons/call-gray.png" mode="widthFix"></image>
									</view>
								</template>
							</uni-list-item>
							<uni-list-item class="list-item">
								<template v-slot:body>
									<view class="list-item-body">
										<view class="title">王总 <view class="tags">
												<view class="tag">法人</view>
											</view>
										</view>
										<view class="desc">13800138000</view>
									</view>
								</template>
								<template v-slot:footer>
									<view class="list-item-footer">
										<image class="image" src="/static/icons/call-gray.png" mode="widthFix"></image>
									</view>
								</template>
							</uni-list-item>
						</uni-list>
					</view>
				</view>
			</view>
		</view>
		<page-foot :tabs="tabs"></page-foot>
	</view>
</template>
<script>
	import {
		clueTabs
	} from '../data';
	import {
		clueSvc
	} from '../clueSvc';
	import {
		dictSvc
	} from "../../../../common/dictSvc"

	export default {
		data() {
			return {
				id: null,
				data: {
					details: {},
					records: [],
					relations: {
						contacts: [],
						members: []
					}
				},
				map: {
					sourceType: {
						target: 'af74c4ca1a2840d09ca77b4a2625317d',
						options: {}
					}
				},
				fixed: false,
				tab: 1,
				tabs: clueTabs
			}
		},
		onReady() {},
		onLoad(options) {
			const {
				id
			} = this.options;
			this.id = id;
			this.initData();
		},
		created() {
			uni.$on('footEvent', this.footEvent);
		},
		beforeDestroy() {
			uni.$off('footEvent', this.footEvent);
		},
		onPageScroll() {
			const scrollHeight = document.documentElement && document.documentElement.scrollTop; //获取滚动条的高度
			const handHeight = this.$refs.profile.$el.offsetHeight; //获取元素高度
			if (scrollHeight >= handHeight) {
				this.fixed = true
			} else {
				this.fixed = false
			}
		},
		methods: {
			footEvent(e) {
				if (e.code === 'edit') {
					uni.navigateTo({
						url: `/pages/dashboard/clue/edit/edit?id=1`
					})
				}
			},
			tabChange(tab) {
				this.tab = tab;
				if (this.fixed) {
					const handHeight = this.$refs.profile.$el.offsetHeight;
					uni.pageScrollTo({
						scrollTop: handHeight
					});
				}
			},
			async initKeyMap() {
				for (const key in this.map) {
					const res = await dictSvc.options(this.map[key].target);
					const options = {};
					res.forEach(item => {
						options[item.label] = item.value;
					});
					const result = {
						options,
						target: this.map[key].target
					};
					this.$set(this.map, key, result);
				}
				console.log(this.map);
			},
			initData() {
				clueSvc.item(this.id).then(res => {
					console.log(res);
					this.$set(this.data, 'details', res);
				});
				setTimeout(() => {
					this.max = 0;
					const records = [{
							id: "2022-11-11",
							items: [{
									name: '录跟进-去电',
									content: '说在忙，稍后联系，后续再做跟进',
									images: ['/static/test.png', '/static/test.png'],
									follow_by: '王帅帅',
									time: '10:31'
								},
								{
									name: '录跟进-去电',
									content: '说在忙，稍后联系，后续再做跟进',
									images: ['/static/test.png', '/static/test.png'],
									follow_by: '王帅帅',
									time: '10:21'
								}
							]
						},
						{
							id: "2022-11-10",
							items: [{
									name: '录跟进-去电',
									content: '说在忙，稍后联系，后续再做跟进',
									images: ['/static/test.png', '/static/test.png'],
									follow_by: '王帅帅',
									time: '10:31'
								},
								{
									name: '录跟进-去电',
									content: '说在忙，稍后联系，后续再做跟进',
									images: ['/static/test.png', '/static/test.png'],
									follow_by: '王帅帅',
									time: '10:21'
								}
							]
						},
					];
					this.data.records = this.data.records.concat(records);
				}, 300);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-profile {
		margin-bottom: 5px;
	}

	.uni-list {
		&::after {
			display: none;
		}

		/deep/ .uni-list--border {
			display: none !important;
		}
	}

	.tab-content {
		min-height: 100vh;
		overflow: hidden;

		.uni-list {
			margin-top: 10px;

			&.keyvalues {
				&:first-child {
					margin-top: 0;
				}
			}
		}

		&.records {
			background-color: #fff;
		}
	}

	.panel {
		margin: 20rpx;
	}
</style>