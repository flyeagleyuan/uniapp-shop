<template>
	<view class="conster-footer">
		<view class="download download-ios" @click="handleIosDownload">
			<text class="ios-text">苹果下载</text>
		</view>
		<view class="download download-android" @click="downloadApp">
			<text>安卓下载</text>
		</view>
		<uni-popup ref="downloadPop" type="center">
			<view class="download-ios-container">
				<view class="title">请选择您要下载的类型</view>
				<view class="text-container">
					<view class="text-item" @click="goIosDownload(item.downloadAdd)"
						v-for="(item, index) in iosDownloadList" :key="index">
						<button size="mini"
							:type="item.isOfficial===2?'plain':'primary'">{{item.isOfficial===2?'官替版':'非官替版'}}</button>
					</view>
				</view>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import {
		fetchClientDownloadList,
	} from "@/api/pay/index.js"

	export default {
		name: 'DownloadApp',
		data() {
			return {
				downloadList: []
			}
		},
		computed: {
			iosDownloadList() {
				return this.downloadList?.filter(item => item.appType === 'ios')
			}
		},
		async mounted() {
			const data = await fetchClientDownloadList()
			this.downloadList = [...data]
		},
		methods: {
			goIosDownload(url) {
				if (!url) {
					uni.showToast({
						title: '下载地址错误',
						icon: 'error',
						duration: 1000
					})
				} else {
					location.href = url
				}
			},
			handleIosDownload() {
				this.$refs.downloadPop.open()
			},
			//下载app downloadApp=0？IOS:Android
			downloadApp() {
				const currentPlatform = this.downloadList?.filter(item => item.appType === 'android')[0]
				location.href = currentPlatform?.downloadAdd
			},
		}
	}
</script>

<style lang="scss" scoped>
	.download-ios-container {
		width: 700rpx;
		margin: 0 auto;
		padding: 70rpx 0;
		text-align: center;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		font-size: 36rpx;
		border-radius: 24rpx;

		.title {
			height: 60rpx;
			line-height: 60rpx;
			margin-bottom: 20rpx;
			color: #333
		}

		.text-container {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			height: 68rpx;
			line-height: 2.3;
		}

		.text-item {
			width: 240rpx;
		}
	}

	.conster-footer {
		position: relative;
		display: flex;
		flex-direction: row;
		margin: 0 24rpx 30rpx;
		background: rgba(255, 255, 255, 0.72);
		color: #fff;
		padding: 20rpx 16rpx;
		box-sizing: border-box;
		border-radius: 8rpx;

		.download {
			position: relative;
			width: 315rpx;
			height: 207rpx;
			background: url(@/static/image/index-page/download_ios_bg.png) no-repeat 50% 50%;
			background-size: contain;
			box-shadow: 6rpx 6rpx 3rpx #e2e8ea;

			&-android {
				margin-left: 10rpx;
				background: url(@/static/image/index-page/download_android_bg.png) no-repeat 50% 50%;
				background-size: contain;
			}

			text {
				font-size: 24rpx;
				position: absolute;
				bottom: 20rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>