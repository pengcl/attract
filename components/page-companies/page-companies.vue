<template name="page-filter-companies">
	<view class="page-filter">
	    <view class="page-filter__wrapper">
	        <view class="search-bar">
				<view class="search-bar-wrapper">
					<text class="uni-icon">&#xe568;</text>
				    <input class="uni-input" @input="onSearch" placeholder="请输入密码" />
				</view>
			</view>
	    </view>
	</view>
</template>

<script>
	import {companySvc} from "./companySvc"
	export default {
		name: "page-filter-companies",
		props: {
			name: {
				type: String,
				default: ""
			}
		},
		created() {
			this.findData();
		},
		methods: {
			findData(){
				companySvc.find(this.name).then(res=>{
					console.log(res);
				});
			},
			onSearch(e){
				console.log(e);
				const {value} = e.detail;
				this.name = value;
				this.findData();
			},
			submit() {
				uni.showModal({
					content:"hello uni-app开源地址为https://github.com/dcloudio/uni-app/tree/master/examples，请在这个开源项目上贡献你的代码",
					showCancel:false
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.page-filter {
		height: 88px;
		.page-filter__wrapper {
			position: fixed;
			width: 100%;
			z-index: 99999;
			background-color: #3A74C5;
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
	}
</style>
