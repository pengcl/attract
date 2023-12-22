<template>
	<view class="page page-has_title">
		<page-filter :sourceParams="params"></page-filter>
		<uni-list class="list-items">
			<uni-list-item class="list-item" v-for="(item,index) in data" clickable @click="link(item)" :key="index">
				<template v-slot:header>
					<view class="list-item-header">
						<view class="avatar">{{item.short}}</view>
					</view>
				</template>
				<template v-slot:body>
					<view class="list-item-body">
						<view class="title">{{item.name}}</view>
						<view class="desc">
							<view>归属人：{{item.customerName}}</view>
							<view>
								来源：{{map.sourceType.options[item.sourceType] ? map.sourceType.options[item.sourceType] : '无'}}
							</view>
							<view>最近跟进：{{item.updateTime}}</view>
						</view>
					</view>
				</template>
				<template v-slot:footer>
					<view class="list-item-footer">
						<image class="image" src="/static/icons/call-gray.png" mode="widthFix"></image>
						<image class="image" src="/static/icons/chat-gray.png" mode="widthFix"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		<view @click="add()" class="float-btn">
			<image src="../../../../static/plus.png"></image>
		</view>
	</view>
</template>
<script>
	import {
		contactsSvc
	} from '../contactsSvc';
	import {
		dictSvc
	} from "../../../../common/dictSvc"
	import {
		contactsDto
	} from '../data';
	export default {
		data() {
			return {
				title: '下拉刷新 + 加载更多',
				data: [

				],
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0,
				map: {
					sourceType: {
						target: 'af74c4ca1a2840d09ca77b4a2625317d',
						options: {}
					}
				},
				params: {
					customerName: '',
					customerType: '',
					level: '',
					phone: '',
					optionalPhone: '',
					orderField: '',
					orderType: '',
					sourceType: '',
					status: '',
					createTimeStart: '',
					createTimeEnd: '',
					updateTimeStart: '',
					updateTimeEnd: '',
					pageNum: 1,
					pageSize: 10
				}
			}
		},
		onLoad() {
			this.initData();
			this.initKeyMap();
			uni.$on('paramsChange', this.paramsChange)
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() {
			console.log("onReachBottom");
			/* if (this.max > 40) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setListData();
			}, 300); */
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.initData();
		},
		beforeDestroy() {
			uni.$off('paramsChange', this.paramsChange);
		},
		methods: {
			initData() {
				contactsSvc.find(this.params).then(res => {
					const data = res.list;
					data.forEach(item => {
						item.short = item.customerName.slice(0, 1);
					});
					this.data = data;
					uni.stopPullDownRefresh();
				});
			},
			async initKeyMap() {
				for (const key in this.map) {
					const res = dictSvc.getOptions(this.map[key].target);
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
			paramsChange(e) {
				console.log(e);
				this.params = e;
				this.initData();
			},
			setListData() {
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
			},
			link(item) {
				console.log(item);
				this.$router.push({
					path: '/pages/dashboard/clue/item/item',
					query: item
				});
			},
			add(){
				this.$router.push({
					path: '/pages/dashboard/clue/edit/edit?id=0',
					query: {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-list {
		margin-top: 5px;

		&::after {
			display: none;
		}
	}

	.float-btn {
		position: fixed;
		bottom: 50rpx;
		right: 50rpx;
		width: 100rpx;
		height: 100rpx;

		image {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>