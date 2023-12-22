<template>
	<view v-if="data" class="page page-has_title">
		<page-profile v-if="profile" :profile="profile" ref='profile'></page-profile>
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
									<view class="title">{{sub.recordTitle}}</view>
									<view class="desc">
										<view>{{sub.recordContent}}</view>
										<view class="thumbs">
											<image v-for="(thumb,i) in sub.images" :src="thumb" :key="i"></image>
										</view>
										<view>跟进人：{{sub.createUserName || '无' }}</view>
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
						<!-- <uni-list-item :border="false" note="来源"
							:rightText="map.sourceType.options[data.details.sourceType] ? map.sourceType.options[data.details.sourceType] : '无'" /> -->
						<uni-list-item :border="false" note="电话"
							:rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="下次联系时间" rightText="右侧文字" />
					</uni-list>
					<uni-list class="keyvalues" :border="false">
						<uni-list-item :border="false" note="归属人"
							:rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="创建人"
							:rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="创建时间"
							:rightText="data.details.createTime ? data.details.createTime : '无'" />
						<uni-list-item :border="false" note="最近修改时间"
							:rightText="data.details.updateTime ? data.details.updateTime : '无'" />
						<uni-list-item :border="false" note="最近修改人"
							:rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="最近跟进时间"
							:rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="最近跟进人"
							:rightText="data.details.phone ? data.details.phone : '无'" />
						<uni-list-item :border="false" note="前归属人"
							:rightText="data.details.phone ? data.details.phone : '无'" />
					</uni-list>
				</template>
			</view>
			<view class="tab-content" v-if="tab === 2">
				<view class="panel">
					<view class="panel-hd">联系人 <view @click="link('customer')" class="more">+添加</view></view>
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
				
				<view class="panel">
					<view class="panel-hd">团队成员 <view @click="link('team')" class="more">+添加</view></view>
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
		contactsSvc
	} from '../contactsSvc';
	import {
		dictSvc
	} from "../../../../common/dictSvc"
	import {
		followSvc
	} from '../../follow/followSvc';
	import moment from 'moment';

	export default {
		data() {
			return {
				id: null,
				profile: null,
				map: {},
				data: {
					details: {},
					records: [],
					relations: {
						contacts: [],
						members: []
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
			this.map = dictSvc.getMap();
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
			link(type){
				if(type === 'contacts'){
					this.$router.push({
						path: '/pages/dashboard/contacts/edit/edit',
						query: {
							id: 0
						}
					});
				}
			},
			footEvent(e) {
				console.log(e);
				if (e.code === 'edit') {
					this.$router.push({
						path: '/pages/dashboard/clue/edit/edit',
						query: {
							id: this.data.details.id
						}
					});
				}
				if (e.code === 'follow') {
					this.$router.push({
						path: '/pages/dashboard/follow/edit/edit',
						query: {
							id: this.data.details.id
						}
					});
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
			async initKeyMap() {},
			initData() {
				contactsSvc.item(this.id).then(res => {
					this.$set(this.data, 'details', res);
					const profile = {
						name: res.customerName,
						source: this.map[res.sourceType] + '-' + this.map[res.sourceSubtype],
						dateTime: res.updateTime
					};
					this.profile = profile;
				});
				followSvc.find(this.id).then(res => {
					const data = [];
					res.forEach(item => {
						item._id = moment(res.createTime).format('YYYY-MM-DD');
						item.time = moment(res.createTime).format('mm:ss');
						const currItem = data.filter(fi => fi._id === item._id)[0];
						if (currItem) {
							currItem.items.push(item);
						} else {
							data.push({
								id: item._id,
								items: [item]
							})
						}
					});
					this.$set(this.data, 'records', data);
				})
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
		.panel-hd {
			padding-right: 3em;
			position: relative;
			.more {
				position: absolute;
				right: 11px;
				top: 11px;
				font-size: 25rpx;
				color: #3A74C5;
			}
		}
	}
</style>