<template name="page-form">
	<view class="page-form">
		<view class="page-form__wrapper">
			<form class="form">
				<uni-list>
					<uni-list-item :class="'control_' + key" v-if="item.type !== 'hidden'"
						v-for="(item, key, index) in form.controls" class="form-control list-item">
						<template v-if="item.type !== 'chips' && item.type !== 'textarea'" v-slot:header>
							<view class="list-item-header">
								{{item.label}}
								<view v-if="item.required" class="required">*</view>
							</view>
						</template>
						<template v-slot:body>
							<view v-if="item.type !== 'chips'" class="list-item-body">
								<template v-if="item.type === 'switch'">
									<switch @change="bindSwitchChange" :data-target="key" name="switch" />
								</template>
								<template v-if="item.type === 'input'">
									<input class="uni-input" :name="key" :data-target="key" @input="onInput"
										v-model="form.controls[key].value" :placeholder="'请输入' + item.label" :disabled="item.readonly" />
								</template>
								<template v-if="item.type === 'select'">
									<picker @change="bindPickerChange" :value="0" :default-value="0" :data-target="key"
										:range="item.options" range-key="value">
										<view class="uni-input">
											{{typeof item.index === 'number' ? item.options[item.index].value : '请选择'}}
										</view>
									</picker>
								</template>
								<template v-if="item.type === 'multiSelector'">
									<picker mode="multiSelector" @columnchange="bindColumnChange"
										@change="bindMultiSelector" :value="item.index" :data-target="key"
										:range="item.options" range-key="value" :disabled="item.readonly">
										<view class="uni-input">
											{{item.value[0] ? item.options[0][item.index[0]].value + '-' + item.options[1][item.index[1]].value : '请选择'}}
										</view>
									</picker>
								</template>
								<template v-if="item.type === 'date'">
									<picker mode="date" :data-target="key" @change="bindDateChange">
										<view class="uni-input">{{item.value ? item.value : '请选择'}}</view>
									</picker>
								</template>

							</view>
							<view v-if="item.type === 'chips'" class="list-item-body">
								<view class="chips-lable">{{item.label}}
									<view v-if="item.required" class="required">*</view>
								</view>
								<view class="chips-options">
									<view class="chips-grids">
										<view v-for="(option,index) in item.options" class="chips-grid">
											<view :data-target="key" :data-index="index" @click="bindChipChange"
												:class="index === item.index ? 'curr' : ''" class="chip-box">
												{{option.value}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-if="item.type === 'textarea'" class="list-item-body" style="width:100%">
								<view class="chips-lable">{{item.label}}
									<view v-if="item.required" class="required">*</view>
								</view>
								<view class="chips-options">
									<textarea :name="key" :data-target="key" @input="onInput"
										v-model="form.controls[key].value" :placeholder="'请输入' + item.label" />
								</view>
							</view>
						</template>
						<template v-if="item.type === 'select' || item.type === 'date'" v-slot:footer>
							<view class="list-item-footer">
								<image class="image" src="/static/icons/right-arrow.png" mode="widthFix"></image>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		validateControl
	} from "../../common/util.js";
	import moment from 'moment';
	export default {
		name: "page-form",
		data() {
			return {
				selected: {

				}
			}
		},
		props: {
			name: {
				type: String,
				default: 'form'
			},
			form: {
				type: Object,
				default: () => {
					return {
						valid: true,
						error: null,
						controls: {}
					}
				}
			}
		},
		created() {
			setTimeout(() => {
				this.onVerifyInputLegal();
			}, 1000)
		},
		methods: {
			bindChipChange: function(e) {
				const {
					target,
					index
				} = e.currentTarget.dataset;
				const item = this.form.controls[target];
				const {
					label,
					value
				} = item.options[index];
				item.index = index;
				item.value = label;
				this.onInputValue(target, item.value);
			},
			bindPickerChange: function(e) {
				const {
					target
				} = e.currentTarget.dataset;
				const item = this.form.controls[target];
				const index = e.detail.value;
				console.log(item.options, index);
				const {
					label,
					value
				} = item.options[index];
				item.index = index;
				item.value = label;
				this.onInputValue(target, item.value);
			},
			bindColumnChange: function(e) {
				console.log(e);
				const {
					target
				} = e.currentTarget.dataset;
				const {
					column,
					value
				} = e.detail;
				const item = this.form.controls[target];
				if (column === 0) {
					item.options[1] = item.options[0][value].items;
					const firstItem = this.form.controls[item.targets[0]];
					firstItem.options = item.options[0];
				} else {
					const lastItem = this.form.controls[item.targets[1]];
					lastItem.options = item.options[1];
				}
			},
			bindMultiSelector: function(e) {
				const {
					target
				} = e.currentTarget.dataset;
				const item = this.form.controls[target];
				const indexs = e.detail.value;
				item.index = indexs;
				item.value = [item.options[0][indexs[0]].label, item.options[1][indexs[1]].label];
				console.log(item.value);
				this.setTargetValue(item.targets[0], item.options[0][indexs[0]]);
				this.setTargetValue(item.targets[1], item.options[1][indexs[1]]);
				console.log(indexs);
			},
			setTargetValue: function(target, option) {
				const {
					label,
					value
				} = option;
				const item = this.form.controls[target];
				item.value = label;
				this.onInputValue(target, label);
			},
			bindDateChange: function(e) {
				const {
					value
				} = e.detail;
				const {
					target
				} = e.currentTarget.dataset;
				const item = this.form.controls[target];
				item.value = moment(value).format('YYYY-MM-DD HH:mm:ss');
				this.onInputValue(target, item.value);
			},
			bindSwitchChange: function(e) {
				const {
					value
				} = e.detail;
				const {
					target
				} = e.currentTarget.dataset;
				const item = this.form.controls[target];
				item.value = value;
				this.onInputValue(target, item.value);
			},
			onVerifyInputLegal() {
				const {
					controls
				} = this.form;
				let valid = true;
				for (const key in controls) {
					const control = controls[key];
					control.valid = validateControl(control);
					if (!control.valid) {
						valid = false;
					}
				}
				this.form.valid = valid;
				let result = {
					isLegal: false,
					tips: '请完整填写本表单！',
				};
				if (this.form.valid) {
					result = {
						isLegal: true,
						tips: '添加成功',
					};
				};
				uni.$emit('verifyChange', {
					isLegal: result.isLegal,
					tips: result.tips,
					form: this.name
				});
				return result;
			},
			onInputValue(target, value) {
				const {
					isLegal,
					tips
				} = this.onVerifyInputLegal();
				uni.$emit('inputChange', {
					control: target,
					value,
					form: this.name
				});
			},
			onInput(e) {
				const {
					target
				} = e.currentTarget.dataset;
				const {
					value
				} = e.detail;
				this.onInputValue(target, value);
			}
		}
	}
</script>
<style scoped lang="scss">
	.form {
		.list-item-header {
			min-width: 5em;
			margin-right: 20rpx;

			.required {
				display: inline-block;
				position: relative;
				color: #FF0000;
				margin-left: 10rpx;
			}
		}

		.list-item-body {
			flex: 1 1 auto;
			text-align: right;

			p {
				height: 26px;
				padding: 7px 13px;
				line-height: 26px;
				font-size: 14px;
				background: #FFF;

			}

			switch {
				margin: 9rpx 0;
			}
		}

		.list-item-footer {
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}

		/deep/ {
			.uni-list-item__container {
				padding: 11rpx 30rpx;
				align-items: center;
				min-height: 98rpx;
				box-sizing: border-box;
			}

			.uni-list {
				background-color: #efeff4;
			}

			.uni-list::after {
				display: none;
			}

			.uni-list--border-bottom {
				display: none;
			}
		}

		.chips-lable {
			text-align: left;
			line-height: 98rpx;
		}
		
		.chips-lable .required {
			display: inline-block;
			position: relative;
			color: #FF0000;
			margin-left: 10rpx;
		}

		.chips-options {
			text-align: left;
		}

		.chips-grids {
			display: flex;
			align-items: center;
			margin: 0 -20rpx;

			.chips-grid {
				flex: 1 1 auto;
				text-align: center;
				padding: 20rpx;

				.chip-box {
					height: 58rpx;
					border-radius: 8rpx;
					line-height: 58rpx;
					background-color: #EEEEEE;

					&.curr {
						background-color: #DDEBFF;
						color: #3A74C5;
					}
				}
			}
		}
	}
</style>