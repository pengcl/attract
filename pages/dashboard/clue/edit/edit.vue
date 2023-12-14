<template>
	<view class="page">
		<page-form :name="'leadsForm'" :form="form.leadsForm"></page-form>
		<template v-if="more">
			<page-form v-if="form.enterpriseInfoForm" :name="'enterpriseInfoForm'"
				:form="form.enterpriseInfoForm"></page-form>
			<page-form v-if="form.leadsIntentionInfoForm" :name="'leadsIntentionInfoForm'"
				:form="form.leadsIntentionInfoForm"></page-form>
			<uni-list-item class="form-control list-item" style="margin-top: 10rpx;">
				<template v-slot:header>
					<view class="list-item-header">

					</view>
				</template>
				<template v-slot:body>
					<view class="list-item-body">
						<label>
							<checkbox value="读书" /><text>同步创建联系人</text>
						</label>
					</view>
				</template>
			</uni-list-item>
			<page-form v-if="form.contactsForm" :name="'contactsForm'" :form="form.contactsForm"></page-form>
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
	export default {
		data() {
			return {
				id: null,
				data: null,
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
			if (this.id && this.id !== '0') {
				this.getData();
			} else {
				await this.initForm();
				uni.$on('inputChange', this.inputChange);
				uni.$on('verifyChange', this.verifyChange)
			}
			// this.initData();
		},
		beforeDestroy() {
		    uni.$off('inputChange',this.inputChange);
			uni.$off('verifyChange',this.verifyChange);
		},
		methods: {
			setMore() {
				this.more = !this.more;
			},
			verifyChange(e) {
				const result = {
					isLegal: true,
					tips: ''
				};
				for (const key in this.form) {
					if (typeof this.form[key] === 'object') {
						if(!this.form[key].valid){
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
				console.log(leadsIntentionInfoControls);

				if (!this.id || this.id === '0') {
					leadsIntentionInfoControls.leadsId.required = false;
				} else {
					leadsIntentionInfoControls.leadsId.required = true;
					leadsIntentionInfoControls.leadsId.value = this.id;
				}
				await this.createForm('leadsIntentionInfo', leadsIntentionInfoControls);

			},
			getData() {
				console.log('getData');
			},
			getValue(key){
				const value = {};
				const controls = this.form[key + 'Form'].controls;
				for (const controlKey in controls) {
					value[controlKey] = controls[controlKey].value;
				}
				return value;
			},
			submit() {
				console.log(this.form);
				if (!this.form.valid) {
					return false;
				}
				const keys = ['leads', 'enterpriseInfo', 'leadsIntentionInfo', 'contacts'];
				const leadsValue = this.getValue('leads');
				const enterpriseInfoValue = this.getValue('enterpriseInfo');
				const leadsIntentionInfoValue = this.getValue('leadsIntentionInfo');
				const contactsValue = this.getValue('contacts');
				const data = {
					leads:leadsValue,
					enterpriseInfo: null,
					leadsIntentionInfo:leadsIntentionInfoValue,
					contacts: null
				};
				clueSvc.create(data).then(res=>{
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
</style>