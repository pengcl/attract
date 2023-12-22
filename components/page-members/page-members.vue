<template name="page-members">
	<view class="page-filter page-members">
		<view class="page-filter__wrapper">
			<view class="counts">
				<view class="uni-flex uni-row">
					<view data-target="sort" class="flex-item">
						<view class="filter-item">
							共{{count}}人
						</view>
					</view>
					<view data-target="filter" class="flex-item">
						<view style="text-align: right;" class="filter-item">
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sort-page filter-wrap">
			<empty v-if="items && items.length === 0"></empty>
			<template v-if="count > 1">
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
			</template>
		</view>
	</view>
</template>

<script>
	import {
		dictSvc
	} from "../../common/dictSvc";
	import {
		teamSvc
	} from "../../pages/dashboard/team/teamSvc";
	export default {
		name: "page-members",
		data() {
			return {
				tab: '',
				params: {
					orderField: "",
					orderType: true,
					pageNum: 1,
					pageSize: 10,
					phone: "",
					userName: ""
				},
				debouncedSearch: null,
				items: null
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
		computed: {
			count() {
				let total = 0;
				for (const key in this.selected) {
					if (this.selected[key]) {
						total = total + 1;
					}
				}
				return total;
			}
		},
		watch: {
			'selected': {
				handler(newValue, oldValue) {
					console.log(newValue);
				},
				immediate: false,
				deep: true
			}
		},
		created() {
			teamSvc.members(this.params).then(res => {
				console.log(res.list);
				this.items = res.list;
			})
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
			handleSelectAll() {
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

		&.page-members {
			height: 50px;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: #efeff4;
			z-index: 999999;
		}

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
		top: 50px;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #efeff4;
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