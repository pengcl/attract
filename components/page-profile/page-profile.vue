<template name="page-profile">
	<view class="page-profile">
		<view class="page-profile__wrapper">
			<view class="bg"></view>
			<view class="profile">
				<uni-list class="list-items">
					<uni-list-item class="list-item">
						<template v-slot:header>
							<view class="list-item-header">
								<view class="avatar">{{profile.name.slice(0,1)}}</view>
							</view>
						</template>
						<template v-slot:body>
							<view class="list-item-body">
								<view class="title">{{profile.name}} <image src="/static/icons/authentication-gray.png"></image></view>
								<view class="desc">
									<view>来源：{{profile.source}}</view>
									<view>最近跟进：{{profile.dateTime}}</view>
								</view>
								<view class="actions">
									<view class="uni-flex uni-row">
										<view class="flex-item">
											<view class="filter-item">
												<image src="/static/icons/call-gray.png"></image>
											</view>
										</view>
										<view class="flex-item">
											<view class="filter-item">
												<image src="/static/icons/calendar-gray.png"></image>
											</view>
										</view>
										<view class="flex-item">
											<view class="filter-item">
												<image src="/static/icons/message-gray.png"></image>
											</view>
										</view>
										<view class="flex-item">
											<view class="filter-item">
												<image src="/static/icons/chat-gray.png"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "page-filter",
		props: {
			profile: {
				type: Object,
				default: ""
			}
		},
		methods: {
			submit() {
				uni.showModal({
					content: "hello uni-app开源地址为https://github.com/dcloudio/uni-app/tree/master/examples，请在这个开源项目上贡献你的代码",
					showCancel: false
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.page-profile {
		.page-profile__wrapper {
			position: relative;
			width: 100%;
			z-index: 997;
			background-color: transparent;
		}

		.bg {
			height: 66px;
			background-color: #3A74C5;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
		}

		.profile {
			position: relative;
			z-index: 1;
		}
		.actions {
			margin-top: 20px;
			margin-right: 50px;
			.flex-item {
				width: 25%;
				text-align: center; 
				}
			image {
				display: block;
				width: 40px;
				height: 40px;
				margin: 0 auto;
			}
		}
		.uni-list:after {
			display: none !important;
		}
	}
</style>