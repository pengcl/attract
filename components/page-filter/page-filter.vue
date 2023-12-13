<template name="page-filter">
	<view class="page-filter">
	    <view class="page-filter__wrapper">
	        <view class="search-bar">
				<view class="search-bar-wrapper">
					<text class="uni-icon">&#xe568;</text>
				    <input class="uni-input" placeholder="请输入密码" />
				</view>
			</view>
			<view class="filters">
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
	    </view>
		<view v-if="tab === 'sort'" class="sort-page filter-wrap">
			<view class="filter-section">
				<view class="filter-label">排序方式</view>
				<view class="filter-options">
					<uni-grid :column="3" :showBorder="false"  :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" :data-value="true" data-target="orderType" :class="params.orderType ? 'curr' : ''" class="option-item">
								<text class="text">倒序排序</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" :data-value="false" data-target="orderType" :class="!params.orderType ? 'curr' : ''" class="option-item">
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
					<uni-grid :column="3" :showBorder="false"  :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" data-value="createTime" data-target="orderField" :class="params.orderField === 'createTime' ? 'curr' : ''" class="option-item">
								<text class="text">创建时间</text>
							</view>
						</uni-grid-item>
						<!-- <uni-grid-item>
							<view data-value="createTime" data-target="orderField" class="option-item">
								<text class="text">最近跟进时间</text>
							</view>
						</uni-grid-item> -->
						<uni-grid-item>
							<view @click="setParams" data-value="updateTime" data-target="orderField" :class="params.orderField === 'updateTime' ? 'curr' : ''" class="option-item">
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
				<uni-grid :column="3" :showBorder="false"  :square="false" :highlight="false">
					<uni-grid-item><view @click="close" class="gray btn">关闭</view></uni-grid-item>
					<uni-grid-item><view @click="reset" class="gray btn">重置</view></uni-grid-item>
					<uni-grid-item><view @click="submit" class="btn">保存</view></uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<view v-if="tab === 'filter'" class="filter-page filter-wrap">
			<view class="filter-section">
				<view class="filter-label">客户类型</view>
				<view class="filter-options">
					<uni-grid :column="4" :showBorder="false"  :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" data-value="" data-target="customerType" :class="params.customerType === '' ? 'curr' : ''" class="option-item">
								<text class="text">全部</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" data-value="1" data-target="customerType" :class="params.customerType === '1' ? 'curr' : ''" class="option-item">
								<text class="text">企业</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" data-value="2" data-target="customerType" :class="params.customerType === '2' ? 'curr' : ''" class="option-item">
								<text class="text">个人</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="filter-section">
				<view class="filter-label">等级</view>
				<view class="filter-options">
					<uni-grid :column="3" :showBorder="false"  :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setParams" data-value="" data-target="level" :class="params.level === '' ? 'curr' : ''" class="option-item">
								<text class="text">全部</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" data-value="A" data-target="level" :class="params.level === 'A' ? 'curr' : ''" class="option-item">
								<text class="text">A</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" data-value="B" data-target="level" :class="params.level === 'B' ? 'curr' : ''" class="option-item">
								<text class="text">B</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" data-value="C" data-target="level" :class="params.level === 'C' ? 'curr' : ''" class="option-item">
								<text class="text">C</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setParams" data-value="D" data-target="level" :class="params.level === 'D' ? 'curr' : ''" class="option-item">
								<text class="text">D</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="page-footer-placeholder"></view>
			<view class="page-footer">
				<uni-grid :column="3" :showBorder="false"  :square="false" :highlight="false">
					<uni-grid-item><view @click="close" class="gray btn">关闭</view></uni-grid-item>
					<uni-grid-item><view @click="reset" class="gray btn">重置</view></uni-grid-item>
					<uni-grid-item><view @click="submit" class="btn">保存</view></uni-grid-item>
				</uni-grid>
			</view>
		</view>
		<view v-if="tab === 'bulk'" class="bulk-page filter-wrap">
			<view class="page-footer-placeholder"></view>
			<view class="page-footer">
				<uni-grid :column="3" :showBorder="false"  :square="false" :highlight="false">
					<uni-grid-item><view @click="close" class="gray btn">关闭</view></uni-grid-item>
					<uni-grid-item><view @click="reset" class="gray btn">重置</view></uni-grid-item>
					<uni-grid-item><view @click="submit" class="btn">保存</view></uni-grid-item>
				</uni-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "page-filter",
		data() {
			return {
				tab: '',
				params: {}
			}
		},
		props: {
			sourceParams: {
				type: Object,
				default: null
			}
		},
		created(){
			this.params = JSON.parse(JSON.stringify(this.sourceParams));
		},
		methods: {
			tabChange(e){
				const {target} = e.currentTarget.dataset;
				this.tab = target;
			},
			setParams(e){
				const {target, value} = e.currentTarget.dataset;
				this.$set(this.params, target, value);
			},
			reset(){
				this.params = JSON.parse(JSON.stringify(this.sourceParams));
			},
			close(){
				this.tab = '';
			},
			submit() {
				this.tab = '';
				uni.$emit('paramsChange', this.params);
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
