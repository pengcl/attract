<template>
	<view class="page">
		<view class="login-panel">
			<view class="login-header">
				<view class="h1">您好！</view>
				<view class="h2">欢迎来到新赏家移动招商</view>
			</view>
			<view class="login-body">
				<view class="login-types">
					<uni-grid :column="2" :showBorder="false" :square="false" :highlight="false">
						<uni-grid-item>
							<view @click="setType" data-target="pass" :class="type === 'pass' ? 'curr' : ''"
								class="option-item">
								<text class="text">密码登录</text>
							</view>
						</uni-grid-item>
						<uni-grid-item>
							<view @click="setType" data-target="sms" :class="type === 'sms' ? 'curr' : ''"
								class="option-item">
								<text class="text">验证码登录</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
				<view class="login-form">
					<view class="login-control">
						<view class="uni-input-wrapper">
							<image class="uni-icon" src="/static/auth/user.png"></image>
							<input @input="onInput" v-model="form.controls['account'].value" data-target="account" class="uni-input" placeholder="请输入手机号" />
						</view>
					</view>
					<view class="login-control">
						<view class="uni-input-wrapper">
							<image class="uni-icon" src="/static/auth/pass.png"></image>
							<input @input="onInput" v-model="form.controls['password'].value" data-target="password" class="uni-input" placeholder="请输入密码" />
						</view>
					</view>
					<view class="submit-btn login-control">
						<view :class="form.valid ? '' : 'invalid'" class="uni-input-wrapper">
							<view @click="submit" class="uni-input">登录</view>
						</view>
					</view>
				</view>
				<view class="forgot">忘记密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		validateControl
	} from "../../../common/util.js";
	import {
		loginDto
	} from "../data";
	import {
		authSvc
	} from "../authSvc";
	export default {
		data() {
			return {
				type: 'pass',
				form: {
					valid: false,
					error: '',
					controls: {
						account: '',
						password: ''
					}
				}
			}
		},
		onReady() {},
		async onLoad(options) {
			this.initForm();
		},
		beforeDestroy() {},
		methods: {
			initForm() {
				const controls = JSON.parse(JSON.stringify(loginDto));
				this.$set(this.form, 'controls', controls);
			},
			setType(e) {
				const {
					target
				} = e.currentTarget.dataset;
				this.type = target;
			},
			onVerifyInputLegal() {
				const {
					controls
				} = this.form;
				let valid = true;
				console.log(controls);
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
						tips: '登录成功',
					};
				};
				return result;
			},
			onInputValue(target, value) {
				const {
					isLegal,
					tips
				} = this.onVerifyInputLegal();
				console.log(this.form);
				this.$set(this.form, 'valid', isLegal);
				this.$set(this.form, 'error', tips);
			},
			onInput(e) {
				const {
					target
				} = e.currentTarget.dataset;
				const {
					value
				} = e.detail;
				this.onInputValue(target, value);
			},
			getValue(controls){
				const value = {};
				for (const key in controls) {
					value[key] = controls[key].value;
				}
				return value;
			},
			submit() {
				if (!this.form.valid) {
					return false;
				}
				const data = this.getValue(this.form.controls);
				authSvc.login(data).then(res=>{
					console.log(res);
				});
				// clueSvc.create(data).then(res => {});
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		min-height: 100vh;
		background-image: url(../../../static/auth/auth_bg.jpg);
		background-size: cover;
		background-repeat: no-repeat;
		position: relative;

		.login-panel {
			position: absolute;
			width: 640rpx;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -60%, 0);

			.login-header {
				.h1 {
					font-size: 60rpx;
					color: #fff;
				}

				.h2 {
					font-size: 32rpx;
					color: #fff;
					margin-top: 30rpx;
				}
			}

			.login-body {
				background-color: #fff;
				border-radius: 32rpx;
				padding: 30rpx;
				margin-top: 50rpx;

				.login-types {
					text-align: center;
					font-size: 36rpx;
					color: #333;
					margin-bottom: 50rpx;

					.option-item {
						padding: 20rpx 0 10rpx;
						position: relative;
					}

					.curr {
						color: #3A74C5;

						&::after {
							content: '';
							position: absolute;
							height: 4rpx;
							width: 2em;
							bottom: 0;
							left: 50%;
							margin-left: -1em;
							background-color: #3A74C5;
						}
					}
				}
			}
		}
	}

	.login-control {
		margin: 20rpx 0;

		.uni-input-wrapper {
			position: relative;
			padding: 8rpx 0 8rpx 60rpx;
			box-sizing: border-box;
			background-color: #F5F7FB;
			border-radius: 48rpx;

			.uni-icon {
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				left: 30rpx;
				top: 22rpx;
			}

			.uni-input {
				height: 52rpx;
				padding: 14rpx 26rpx;
				line-height: 52rpx;
				font-size: 28rpx;
				background: transparent;
			}
		}

		&.submit-btn {
			margin-top: 70rpx;

			.uni-input-wrapper {
				padding: 8rpx 0;
				background: #3A74C5;
				color: #fff;
				text-align: center;
				&.invalid {
					opacity: 0.4;
				}
			}
		}
	}

	.forgot {
		font-size: 28rpx;
		color: #666;
		margin: 40rpx 0 40rpx 20rpx;
	}
</style>