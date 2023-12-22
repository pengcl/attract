<template name="empty">
	<view class="empty-content">
	  <!-- <ion-icon [name]="icon"></ion-icon> -->
	  <image src="../../static/empty.png"></image>
	  <view class="h3">{{title}}</view>
	  <view class="p">{{desc}}</view>
	</view>

</template>

<script>
	export default {
		name: "empty",
		props: {
			title: {
				type: String,
				default: '没有记录'
			},
			desc: {
				type: String,
				default: ''
			}
		},
		methods: {
		}
	}
</script>
<style>
	.empty-content {
	  width: 100%;
	  padding: 50rpx 0 30rpx;
		
	  image {
	    width: 100rpx;
	    height: 100rpx;
	    color: #ccc;
	    display: block;
	    margin: 0 auto;
	  }
		
	  .h3 {
	    color: #999;
	    text-align: center;
	    font-size: 28rpx;
	  }
	}
</style>