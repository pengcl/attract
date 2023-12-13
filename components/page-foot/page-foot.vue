<template name="page-foot">
	<uni-tabbar class="uni-tabbar-bottom">
		<view class="uni-tabbar" style="background-color: rgb(248, 248, 248); backdrop-filter: none;">
			<view class="uni-tabbar-border" style="background-color: rgba(0, 0, 0, 0.33);"></view>
			<view @click="handleClick(item)" v-for="(item,index) in tabs" class="uni-tabbar__item">
				<view class="uni-tabbar__bd" style="height: 50px;">
					<view class="uni-tabbar__icon" style="width: 24px; height: 24px;">
						<image style="width: 24px; height: 24px;" :src="item.icon"></image>
					</view>
					<view class="uni-tabbar__label" style="font-size: 10px; line-height: normal; margin-top: 3px;">
						{{item.label}}
					</view>
				</view>
			</view>
		</view>
		<view class="uni-placeholder" style="height: 50px;"></view>
	</uni-tabbar>
</template>

<script>
	export default {
		name: "page-foot",
		props: {
			tabs: {
				type: Array,
				default: []
			},
			current: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleClick(e){
				uni.$emit('footEvent', e);
			}
		}
	}
</script>
<style>
	.uni-tabbar__icon {
		width: 24px;
		height: 24px;

		uni-image {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>