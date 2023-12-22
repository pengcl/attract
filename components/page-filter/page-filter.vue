<template name="page-filter">
	<view class="page-filter">
		<view class="page-filter__wrapper">
			<view v-if="tab !== 'bulk'" class="search-bar">
				<view class="search-bar-wrapper">
					<text class="uni-icon">&#xe568;</text>
					<input @input="debounceInput" v-model="params.customerName" class="uni-input" placeholder="请输入密码" />
				</view>
			</view>
			<view v-if="tab !== 'bulk'" class="filters">
				<view class="uni-flex uni-row">
					<view @click="tabChange" data-target="sort" class="flex-item">
						<view class="filter-item">
							排序<image src="/static/icons/down.png"></image>
						</view>
					</view>
					<view @click="tabChange" data-target="filter" class="flex-item">
						<view class="filter-item">
							筛选<image src="/static/icons/down.png"></image>
						</view>
					</view>
					<view @click="tabChange" data-target="bulk" class="flex-item">
						<view class="filter-item">
							批量<image src="/static/icons/bulk.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tab === 'bulk'" class="counts">
				<view class="uni-flex uni-row">
					<view data-target="sort" class="flex-item">
						<view class="filter-item">
							共{{total}}条
						</view>
					</view>
					<view data-target="filter" class="flex-item">
						<view style="text-align: right;" class="filter-item">
							已选{{count}}条
						</view>
					</view>
				</view>
			</view>
			<view v-if="tab === 'bulk'" class="actions">
				<view class="uni-flex uni-row">
					<view class="flex-item">
						<view class="filter-item">
							<view @click="handleCancel" class="btn">取消</view>
						</view>
					</view>
					<view class="flex-item">
						<view style="text-align: right;" class="filter-item">
							<view @click="handleSelectAll" class="btn">全选</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="tab === 'sort'" class="sort-page filter-wrap">
			<view class="filter-section">
				<view class="filter-label">排序方式</view>
				<view class="filter-options">
					<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" :data-value="true" data-target="orderType"
								:class="params.orderType ? 'curr' : ''" class="option-item">
								<text class="text">倒序排序</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" :data-value="false" data-target="orderType"
								:class="!params.orderType ? 'curr' : ''" class="option-item">
								<text class="text">正序排序</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>

						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="filter-section">
				<view class="filter-label">排序属性</view>
				<view class="filter-options">
					<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" data-value="createTime" data-target="orderField"
								:class="params.orderField === 'createTime' ? 'curr' : ''" class="option-item">
								<text class="text">创建时间</text>
							</view>
						</uni-grid-item>
						<!-- <uni-grid-item>
							<view data-value="createTime" data-target="orderField" class="option-item">
								<text class="text">最近跟进时间</text>
							</view>
						</uni-grid-item> -->
						<uni-grid-item>
							<view @click="setParams" data-value="updateTime" data-target="orderField"
								:class="params.orderField === 'updateTime' ? 'curr' : ''" class="option-item">
								<text class="text">最近修改时间</text>
							</view>
						</uni-grid-item>
						<!-- <uni-grid-item>
							<view data-value="createTime" data-target="orderField" class="option-item">
								<text class="text">入池时间</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view data-value="createTime" data-target="orderField" class="option-item">
								<text class="text">领取/分配时间</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view data-value="createTime" data-target="orderField" class="option-item">
								<text class="text">首次到访时间</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view data-value="createTime" data-target="orderField" class="option-item">
								<text class="text">最近到访时间</text>
							</view>
						</uni-grid-item> -->
					</uni-grid>
				</view>
			</view>
			<view class="page-footer-placeholder"></view>
			<view class="page-footer">
				<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false">
					<uni-grid-item>
						<view @click="close" class="gray btn">关闭</view>
					</uni-grid-item>
					<uni-grid-item>
						<view @click="reset" class="gray btn">重置</view>
					</uni-grid-item>
					<uni-grid-item>
						<view @click="submit" class="btn">保存</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<view v-if="tab === 'filter'" class="filter-page filter-wrap">
			<view class="filter-section">
				<view class="filter-label">客户类型</view>
				<view class="filter-options">
					<uni-grid :column="4" :showBorder="false" :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" data-value="" data-target="customerType"
								:class="params.customerType === '' ? 'curr' : ''" class="option-item">
								<text class="text">全部</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-for="item in customTypes">
							<view @click="setParams" :data-value="item.label" data-target="customerType"
								:class="params.customerType === '1' ? 'curr' : ''" class="option-item">
								<text class="text">{{item.value}}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="filter-section">
				<view class="filter-label">等级</view>
				<view class="filter-options">
					<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" data-value="" data-target="level"
								:class="params.level === '' ? 'curr' : ''" class="option-item">
								<text class="text">全部</text>
							</view>
						</uni-grid-item>
						<uni-grid-item v-for="item in levels">
							<view @click="setParams" :data-value="item.label" data-target="level"
								:class="params.level === item.label ? 'curr' : ''" class="option-item">
								<text class="text">{{item.value}}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="page-footer-placeholder"></view>
			<view class="page-footer">
				<uni-grid :column="3" :showBorder="false" :square="false" :highlight="false">
					<uni-grid-item>
						<view @click="close" class="gray btn">关闭</view>
					</uni-grid-item>
					<uni-grid-item>
						<view @click="reset" class="gray btn">重置</view>
					</uni-grid-item>
					<uni-grid-item>
						<view @click="submit" class="btn">保存</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		dictSvc
	} from "../../common/dictSvc";
	export default {
		name: "page-filter",
		data() {
			return {
				tab: '',
				params: {},
				customTypes: [],
				levels: [],
				debouncedSearch: null
			}
		},
		props: {
			sourceParams: {
				type: Object,
				default: null
			},
			total: {
				type: Number,
				default: 0
			},
			selected: {
				type: Object,
				default: {}
			},
		},
		computed:{
			count(){
				let total = 0;
				for(const key in this.selected){
					if(this.selected[key]){
						total = total + 1;
					}
				}
				return total;
			}
		},
		watch:{
			'selected': {
				handler(newValue, oldValue) {
					console.log(newValue);
				},
				immediate: false,
				deep: true
			}
		},
		created() {
			this.params = JSON.parse(JSON.stringify(this.sourceParams));
			this.customTypes = dictSvc.getOptions('22e964c9882411eea75100163e127ceb');
			this.levels = dictSvc.getOptions('22e6325e882411eea75100163e127ceb');
			console.log(this.levels);
			this.debouncedSearch = this.debounce(this.search, 1000);
		},
		methods: {
			debounceInput(e) {
				const value = e.detail.value;
				this.debouncedSearch(value);
			},
			debounce(func, delay) {
				let timer;
				return function(...args) {
					clearTimeout(timer);
					timer = setTimeout(() => {
						func.apply(this, args);
					}, delay);
				};
			},
			tabChange(e) {
				const {
					target
				} = e.currentTarget.dataset;
				if (e === 'bulk') {
					if (this.tab === 'bulk') {
						this.tab = null;
					}
				} else {
					this.tab = target;
				}
				uni.$emit('paramsChange', {
					type: 'tab',
					data: this.tab
				});
			},
			setParams(e) {
				const {
					target,
					value
				} = e.currentTarget.dataset;
				this.$set(this.params, target, value);
			},
			handleCancel() {
				this.tab = null;
				uni.$emit('paramsChange', {
					type: 'tab',
					data: this.tab
				});
			},
			handleSelectAll(){
				uni.$emit('paramsChange', {
					type: 'action',
					data: 'selectAll'
				});
			},
			reset() {
				this.params = JSON.parse(JSON.stringify(this.sourceParams));
				uni.$emit('paramsChange', {
					type: 'params',
					data: this.params
				});
			},
			search() {
				uni.$emit('paramsChange', {
					type: 'params',
					data: this.params
				});
			},
			close() {
				this.tab = '';
			},
			submit() {
				this.tab = '';
				uni.$emit('paramsChange', {
					type: 'params',
					data: this.params
				});
			}
		}
	}
</script>
<style scoped lang="scss">
	.page-filter {
		height: 88px;

		.page-filter__wrapper {
			position: fixed;
			width: 100%;
			z-index: 99999;
			background-color: #3A74C5;
		}

		.counts {
			padding: 16px 10px 6px;
			line-height: 28px;
			color: #fff;
			font-size: 25rpx;

			.flex-item {
				flex: 1 1 auto;
			}
		}

		.actions {
			padding: 6px 10px;
			line-height: 28px;
			background-color: #fff;
			color: #3A74C5;
			font-size: 25rpx;

			.flex-item {
				flex: 1 1 auto;
			}

			.btn {
				display: inline-block;
			}
		}

		.search-bar {
			padding: 6px 10px;

			.search-bar-wrapper {
				display: flex;
				padding: 2px 13px;
				flex-direction: row;
				flex-wrap: nowrap;
				background-color: #FFFFFF;
				border-radius: 4px;
			}

			.uni-input {
				height: 28px;
				line-height: 28px;
				font-size: 15px;
				padding: 0px;
				flex: 1;
				background-color: #FFFFFF;
			}

			.uni-icon {
				font-family: uniicons;
				font-size: 24px;
				font-weight: normal;
				font-style: normal;
				width: 24px;
				height: 28px;
				line-height: 28px;
				color: #999999;
				margin-right: 5px;
			}
		}

		.filters {
			padding: 8px 13px;

			.flex-item {
				width: 33.3%;
				text-align: center;

				.filter-item {
					height: 28px;
					line-height: 28px;
					font-size: 12px;
					padding-right: 28px;
					display: inline-block;
					position: relative;
					color: #fff;

					uni-image {
						display: block;
						width: 15px;
						height: 15px;
						position: absolute;
						right: 7px;
						top: 7px;
					}
				}
			}
		}
	}

	.filter-wrap {
		position: fixed;
		top: 88px;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		z-index: 99;

		.filter-section {
			padding: 20rpx;

			.filter-label {
				padding: 20rpx 0 10rpx;
			}

			.filter-options {
				margin: 10rpx -10rpx;

				.option-item {
					margin: 10rpx;
					background-color: #eee;
					text-align: center;
					height: 60rpx;
					border-radius: 8rpx;
					line-height: 40rpx;
					padding: 10rpx 0;
					box-sizing: border-box;
					font-size: 30rpx;
					color: #888888;

					&.curr {
						background-color: #DDEBFF;
						color: #3A74C5;
					}
				}
			}
		}
	}
</style>