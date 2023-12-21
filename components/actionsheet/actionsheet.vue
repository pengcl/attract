<template>
	<view enable="true" v-if="wrapperShow">
		<view v-if="wrapperShow" class="root-portal-box">
			<view v-if="mask" class="weui-mask" :class="innerShow ? 'weui-animate-fade-in' : 'weui-animate-fade-out'"
				bindtap="closeActionSheet" aria-role="button" aria-label="关闭"></view>

			<view class="weui-actionsheet" aria-role="dialog" aria-modal="true">
				<!-- 标题 -->
				<block v-if="title">
					<view class="weui-actionsheet__title" tabindex="0">
						<view class="weui-actionsheet__title-text">{{title}}</view>
					</view>
				</block>
				<slot name="title" v-else></slot>
				<view
					:class="!showCancel && index === actions.length-1 ? 'weui-actionsheet__action' : 'weui-actionsheet__menu'"
					:key="index" v-for="(actionItem, index) in actions">
					<block v-if="isNotSlot(actionItem)">
						<view class="weui-actionsheet__cell"
							:class="item.type === 'warn' ? 'weui-actionsheet__cell_warn' : '' " aria-role="button"
							hover-class="weui-active" :key="actionIndex" v-for="(item,actionIndex) in actionItem"
							:data-groupindex="index" :data-index="actionIndex" :data-value="item.value"
							bindtap="buttonTap">
							{{item.text}}
						</view>
					</block>
					<slot :name="actionItem" v-else></slot>
				</view>
				<!-- 取消按钮 -->
				<view class="weui-actionsheet__action" v-if="showCancel">
					<view class="weui-actionsheet__cell weui-actionsheet__cell_cancel" hover-class="weui-active"
						data-type="close" id="iosActionsheetCancel" bindtap="closeActionSheet" aria-role="button">
						{{cancelText}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "action-sheet",
		options: {
			multipleSlots: true // 在组件定义时的选项中启用多slot支持
		},
		props: {
			title: {
				// 标题
				type: String,
				value: ''
			},
			showCancel: {
				// 是否显示取消按钮
				type: Boolean,
				value: true
			},
			cancelText: {
				// 取消按钮文案
				type: String,
				value: '取消'
			},
			maskClass: {
				// 遮罩层class
				type: String,
				value: ''
			},
			extClass: {
				// 弹出窗 class
				type: String,
				value: ''
			},
			maskClosable: {
				// 点击遮罩 关闭 actionsheet
				type: Boolean,
				value: true
			},
			mask: {
				// 是否需要 遮罩层
				type: Boolean,
				value: true
			},
			show: {
				// 是否开启 actionsheet
				type: Boolean,
				value: true,
				observer: '_showChange'
			},
			actions: {
				// actions 列表
				type: Array,
				value: [], // {text, extClass}
				observer: '_groupChange'
			}
		},
		data() {
			return {
				wrapperShow: false,
				innerShow: false
			}
		},
		watch: {
			show(newVal, oldVal) {
				console.log(newVal, oldVal);
				this._showChange(newVal);
			}
		},
		lifetimes: {
			ready() {
				this._showChange(this.data.show)
			}
		},

		methods: {
			isNotSlot(v) {
				return typeof v !== 'string'
			},
			join(a, b) {
				return a + b
			},
			_showChange(show) {
				if (show) {
					this.wrapperShow = true;
					this.innerShow = true;
				} else {
					this.innerShow = false;
					setTimeout(() => {
						this.wrapperShow = false;
					}, 300)
				}
			},
			_groupChange(e) {
				// 支持 一维数组 写法
				if (e.length > 0 && typeof e[0] !== 'string' && !(e[0] instanceof Array)) {
					this.actions = [this.data.actions];
				}
			},
			buttonTap(e) {
				const {
					value,
					groupindex,
					index
				} = e.currentTarget.dataset
				this.triggerEvent('actiontap', {
					value,
					groupindex,
					index
				})
			},
			closeActionSheet(e) {
				const {
					type
				} = e.currentTarget.dataset
				if (this.data.maskClosable || type) {
					// 点击 action 里面的 取消
					this.setData({
						show: false
					})
					// 关闭回调事件
					this.triggerEvent('close')
				}
			}
		}
	}
</script>

<style lang="less">
	.weui-actionsheet__action {
		padding-bottom: 0;
	}

	.weui-actionsheet__cell_cancel {
		padding-bottom: calc(16px + env(safe-area-inset-bottom));
	}

	.weui-actionsheet__title:focus {
		outline: none;
	}
</style>