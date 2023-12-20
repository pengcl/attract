<template>
	<view class="page">
		<page-form ref="leadsForm" :name="'leadsForm'" :form="form.leadsForm"></page-form>
		<template v-if="more">
			<page-form ref="enterpriseInfoForm"
				v-if="form.enterpriseInfoForm && form.leadsForm.controls.customerType.value"
				:name="'enterpriseInfoForm'" :form="form.enterpriseInfoForm"></page-form>
			<page-form ref="leadsIntentionInfoForm" v-if="form.leadsIntentionInfoForm" :name="'leadsIntentionInfoForm'"
				:form="form.leadsIntentionInfoForm"></page-form>
			<uni-list-item class="form-control list-item" style="margin-top: 10rpx;">
				<template v-slot:header>
					<view class="list-item-header">

					</view>
				</template>
				<template v-slot:body>
					<view class="list-item-body">
						<!-- <label>
							<checkbox @change="checkboxChange" value="true" /><text>同步创建联系人</text>
						</label> -->
						<checkbox-group @change="checkboxChange">
							<label>
								<checkbox :value="'1'" :checked="false" />同步创建联系人
							</label>
						</checkbox-group>
					</view>
				</template>
			</uni-list-item>
			<page-form ref="contactsForm" v-if="form.contactsForm && isCreate" :name="'contactsForm'"
				:form="form.contactsForm"></page-form>
		</template>
		<view class="more" @click="setMore">{{more ? '收起' : '展开'}}更多</view>
		<view class="page-footer-placeholder"></view>
		<view class="page-footer">
			<view @click="submit" class="btn" :class="form.valid ? 'valid' : 'invalid'">保存</view>
		</view>
		<!-- <view class="uni-popup">
			<page-companies></page-companies>
		</view> -->

	</view>
</template>
<script>
	import {
		leadsDto,
		enterpriseInfoDto,
		leadsIntentionInfoDto,
		contactsDto
	} from '../data';
	import {
		dictSvc
	} from "../../../../common/dictSvc";
	import {
		clueSvc
	} from "../clueSvc";
	import {
		listToTree
	} from "../../../../common/util.js"
	export default {
		data() {
			return {
				id: null,
				data: null,
				isCreate: false,
				isEnterprise: false,
				more: true,
				form: {
					valid: true,
					error: '',
				}
			}
		},
		onReady() {},
		async onLoad(options) {
			console.log(clueSvc);
			const {
				id
			} = options;
			this.id = id;
			await this.initForm();
			if (this.id && this.id !== '0') {
				this.getData();
			}
			uni.$on('inputChange', this.inputChange);
			uni.$on('verifyChange', this.verifyChange);
			// this.initData();
		},
		beforeDestroy() {
			uni.$off('inputChange', this.inputChange);
			uni.$off('verifyChange', this.verifyChange);
			uni.$off('footEvent', this.footChange);
		},
		watch: {
			'form.leadsForm.controls.customerType.value': {
				handler(newValue, oldValue) {
					this.isEnterprise = newValue;
				},
				immediate: false,
				deep: true
			}
		},
		methods: {
			setMore() {
				this.more = !this.more;
			},
			checkboxChange(e) {

				const values = e.detail.value;
				this.isCreate = values[0] === '1';
			},
			verifyChange(e) {
				const result = {
					isLegal: true,
					tips: ''
				};
				for (const key in this.form) {
					if (typeof this.form[key] === 'object') {
						if (!this.form[key].valid) {
							result.isLegal = false;
							result.tips = this.form[key].error;
						}
					}
				}
				this.$set(this.form, 'valid', result.isLegal);
				this.$set(this.form, 'error', result.tips);
			},
			inputChange(e) {
				// console.log(e);
			},

			async createForm(target, controls) {
				for (const key in controls) {
					const item = controls[key];
					if (item.type === 'select' || item.type === 'chips') {
						item.index = null;
						if (item.options.length === 0 && item.target) {
							const res = await dictSvc.options(item.target);
							item.options = res;
						}
					} else if (item.type === 'multiSelector') {
						item.index = [null, null];
						if (item.options[0].length === 0 && item.target) {
							const res = await dictSvc.options(item.target);
							const items = listToTree(res);
							console.log(items);
							item.options[0] = items;
							item.options[1] = items[0].items;
						}
						console.log(item.options);
					}
				}
				const form = {
					valid: true,
					error: '',
					controls
				};
				this.$set(this.form, target + 'Form', form);
			},
			async initForm() {
				// 初始化leadsForm
				const leadsControls = JSON.parse(JSON.stringify(leadsDto));
				await this.createForm('leads', leadsControls);

				// 初始化contactsForm
				const contactsControls = JSON.parse(JSON.stringify(contactsDto));
				await this.createForm('contacts', contactsControls);

				// 初始化contactsForm
				const enterpriseInfoControls = JSON.parse(JSON.stringify(enterpriseInfoDto));
				await this.createForm('enterpriseInfo', enterpriseInfoControls);

				// 初始化contactsForm
				const leadsIntentionInfoControls = JSON.parse(JSON.stringify(leadsIntentionInfoDto));


				if (!this.id || this.id === '0') {
					leadsIntentionInfoControls.leadsId.required = false;
				} else {
					leadsIntentionInfoControls.leadsId.required = true;
					leadsIntentionInfoControls.leadsId.value = this.id;
				}
				await this.createForm('leadsIntentionInfo', leadsIntentionInfoControls);

			},
			getData() {
				clueSvc.item(this.id).then(res => {
					this.setFormValue('leads', res);
				});
			},
			setFormValue(k, values) {
				console.log(this.form);
				const controls = this.form[k + 'Form'].controls;
				for (const key in controls) {

					if (key === 'pid') {
						this.setValue(k, key, values['id']);
					} else if (key === 'contactsTime') {
						this.setValue(k, key, values['nextFollowTime']);
					} else if (key === 'sources') {
						this.setValue(k, key, [values.sourceType, values.sourceSubtype]);
					} else {
						this.setValue(k, key, values[key]);
					}
				}
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
			setValue(key, target, value) {
				const control = this.form[key + 'Form'].controls[target];
				control.value = value;
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
				this.$refs[key + 'Form'].onInputValue(target, value);
			},
			getValue(key) {
				const value = {};
				const controls = this.form[key + 'Form'].controls;
				for (const controlKey in controls) {
					const control = controls[controlKey];
					if (!control.notPost) {
						value[controlKey] = control.value;
					}
				}
				return value;
			},
			add(data) {
				clueSvc.create(data).then(res => {
					console.log(res);
				});
			},
			update(data) {
				clueSvc.update(data).then(res => {
					console.log(res);
				});
			},
			submit() {
				console.log(this.data);
				console.log(this.form);
				if (!this.form.valid) {
					return false;
				}
				const keys = ['leads', 'enterpriseInfo', 'leadsIntentionInfo', 'contacts'];
				const leadsValue = this.getValue('leads');
				const enterpriseInfoValue = this.isEnterprise ? this.getValue('enterpriseInfo') : null;
				const leadsIntentionInfoValue = this.getValue('leadsIntentionInfo');
				const contactsValue = this.isCreate ? this.getValue('contacts') : null;
				leadsValue.customerType = leadsValue.customerType ? '1' : '0';
				const data = {
					leads: leadsValue,
					enterpriseInfo: enterpriseInfoValue,
					leadsIntentionInfo: leadsIntentionInfoValue,
					contacts: contactsValue
				};
				if (this.id && this.id !== '0') {
					data.leadsId = this.id;
					this.update(data);
				} else {
					this.add(data);
				}
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
</style>