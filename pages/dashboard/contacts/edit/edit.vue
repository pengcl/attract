<template>
	<view class="page">
		<page-form class="common-form" ref="pageForm" :name="'contactsForm'" :form="form"></page-form>
		<view class="page-form" style="margin-top: 10px">
			<view class="page-form__wrapper">
				<form class="form">
					<uni-list>
						<uni-list-item :class="'control_' + key" v-if="key === 'pidType'"
							v-for="(item, key, index) in form.controls" class="form-control list-item">
							<template v-slot:header>
								<view class="list-item-header">
									{{item.label}}
								</view>
							</template>
							<template v-slot:body>
								<view class="list-item-body">
									<radio-group @change="radioChange">
										<label v-for="(option, i) in item.options"
											:key="option.label">
											<radio :disabled="pid" :value="option.label" :checked="i === item.index" /> {{option.value}}
										</label>
									</radio-group>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
				</form>
			</view>
		</view>
		<view class="page-footer-placeholder"></view>
		<view class="page-footer">
			<view @click="submit" class="btn" :class="form.valid ? 'valid' : 'invalid'">保存</view>
		</view>
	</view>
</template>
<script>
	import {
		contactsDto
	} from '../data';
	import {
		dictSvc
	} from "../../../../common/dictSvc";
	import {
		clueSvc
	} from '../../clue/clueSvc';
	import {
		contactsSvc
	} from "../contactsSvc";
	import {
		listToTree
	} from "../../../../common/util.js"
	export default {
		data() {
			return {
				id: null,
				pid: null,
				pidType: null,
				data: null,
				isCreate: false,
				form: {
					valid: true,
					error: '',
				}
			}
		},
		onReady() {},
		async onLoad(options) {
			const {
				id,
				pid,
				pidType
			} = options;
			this.id = id;
			this.pid = pid;
			this.pidType = pidType;
			await this.initForm();
			uni.$on('inputChange', this.inputChange);
			uni.$on('verifyChange', this.verifyChange);
			uni.$on('blurChange', this.blurChange);
			if (this.id && this.id !== '0') {
				this.getData();
			}
			if (this.pid && this.pid !== '0') {
				this.setValue('pid', this.pid);
			}
			if (this.pidType) {
				this.setValue('pidType', this.pidType);
			}
			// this.initData();
		},
		beforeDestroy() {
			uni.$off('inputChange', this.inputChange);
			uni.$off('verifyChange', this.verifyChange);
		},
		watch: {},
		methods: {
			radioChange(e){
				console.log(e);
			},
			verifyChange(e) {
				console.log(e);
				this.$set(this.form, 'valid', e.isLegal);
				this.$set(this.form, 'error', e.tips);
			},
			blurChange(e){
				console.log(e);
			},
			inputChange(e) {
				// console.log(e);
			},

			async createForm(controls) {
				for (const key in controls) {
					const item = controls[key];
					if (item.type === 'select' || item.type === 'chips') {
						item.index = null;
						if (item.options.length === 0 && item.target) {
							const res = dictSvc.getOptions(item.target);
							item.options = res;
						}
					} else if (item.type === 'multiSelector') {
						item.index = [null, null];
						if (item.options[0].length === 0 && item.target) {
							const res = dictSvc.getOptions(item.target);
							const items = listToTree(res);
							item.options[0] = items;
							item.options[1] = items[0].items;
						}
					}
				}
				const form = {
					valid: true,
					error: '',
					controls
				};
				this.form = form;
			},
			async initForm() {
				// 初始化leadsForm
				const controls = JSON.parse(JSON.stringify(contactsDto));
				await this.createForm(controls);

			},
			getData() {
				contactsSvc.item(this.id).then(res => {
					this.setValue('customerName', res.customerName);
					this.setValue('status', res.status);
					this.setValue('level', res.level);
					this.setValue('customerType', res.customerType);
					this.setValue('pid', res.id);
					this.setValue('contactsTime', res.nextFollowTime);
					this.setValue('sourceType', res.sourceType);
					this.setValue('sourceSubtype', res.sourceSubtype);
					this.setValue('sources', [res.sourceType, res.sourceSubtype]);
				});
			},
			getIndex(options, value) {
				let index = null;
				options.forEach((item, i) => {
					if (item.label == value) {
						index = i;
					}
				});
				return index;
			},
			setValue(target, value) {
				this.form.controls[target].value = value;
				const control = this.form.controls[target];
				const {
					type,
					options
				} = control;
				if (type === 'select') {
					control.index = this.getIndex(options, value);
				}
				if (type === 'chips') {
					control.index = this.getIndex(options, value);
				}
				if (type === 'multiSelector') {
					const {
						targets
					} = control;
					control.index[0] = this.getIndex(options[0], value[0]);
					control.options[1] = options[0][control.index[0]].items;
					control.index[1] = this.getIndex(options[1], value[1]);
				}
				this.$refs.pageForm.onInputValue(target, value);
			},

			getValue() {
				const value = {};
				const controls = this.form.controls;
				for (const controlKey in controls) {
					const control = controls[controlKey];
					if (!control.notPost) {
						value[controlKey] = control.value;
					}
				}
				return value;
			},
			submit() {
				if (!this.form.valid) {
					return false;
				}
				const data = this.getValue();
				contactsSvc.create(data).then(res => {
					console.log(res);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	:host {
		height: 100%;
	}

	.page {
		background-color: #efeff4;
		min-height: 100vh;
	}

	.more {
		height: 100rpx;
		box-sizing: border-box;
		padding: 20rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		text-align: center;
		background-color: #DDEBFF;
	}

	.uni-popup {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: #efeff4;
	}


	/deep/ {
		.control_project,
		.control_customerType {
			margin-top: 10rpx;
		}

		.uni-list-item__container {
			padding: 11rpx 30rpx;
			align-items: center;
			min-height: 98rpx;
			box-sizing: border-box;

			uni-checkbox .uni-checkbox-input {
				width: 32rpx;
				height: 32rpx;
				border-radius: 16rpx;
				box-sizing: border-box;

				&:before {
					font-size: 24rpx;
				}

				&.uni-checkbox-input-checked {
					background-color: #3A74C5;
					border: 1px solid #3A74C5;

					&:before {
						color: #fff;
					}
				}
			}
		}
	}

	.list-item-body {
		flex: 1 1 auto;
		text-align: right;

		/deep/ {
			.uni-label-pointer {
				margin-left: 10px;
			}
		}

	}
	
	.common-form {
		/deep/{
			.control_pidType {
				display: none;
			}
		}
	}
</style>