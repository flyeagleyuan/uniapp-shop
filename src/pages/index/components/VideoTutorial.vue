<template>
	<view class="video-container">
		<view class="video-title"></view>
		<view class="tutorial-container">
			<view v-for="(item,index) in tutorialList" :key="index" class="tutorial-item"
				@click="changeTutorial(item,index)" :class="activeVideoIndex == index ? 'activeType' : ''">
				<view class="item-container">
					<view class="icon-container">

						<image class="img-item" :src="item.icon"></image>
					</view>
					<view>{{item.text}}</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="videoMap">
				<view class="switch-container" v-if="activeVideoIndex===0">
					<view class="switch-title">
						<text>请选择您要观看的教程类型</text>
					</view>
					<radio-group class="radio-container" @change="radioChange">
						<label class="label-container" v-for="(item, index) in switchArr" :key="item.value">
							<view>
								<radio :value="item.type" :checked="index === current" />
							</view>
							<view>{{item.text}}</view>
						</label>
					</radio-group>
				</view>
				<view class="video-box">
					<video :src="showVideo" :controls="true" :autoplay="true"> </video>
					<uni-icons type="close" size="30" color="rgb(197 194 194)" class="icon-close"
						@click="handleClose"></uni-icons>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import smileIcon from '@/static/image/index-page/smile_icon.png'
	import yunIcon from '@/static/image/index-page/yun_icon.png'
	import musicIcon from '@/static/image/index-page/music_icon.png'

	export default {
		props: {
			selectedClient: {
				validator(value, props) {
					//传入的值必须为下列选项
					return ['ios', 'android', ].includes(value)
				},
				default: 'ios'
			}
		},
		data() {
			return {
				replyChartVideo: `https://www.anonymity.ink:60/jiaocheng2/huifu.mp4`, //恢复撩天记录恢复从U盘到手机
				IOSActiveVideo: `https://anonymity.oss-cn-shanghai.aliyuncs.com/video/ios_oral.mp4`, //ios的激活
				funcDemo: `https://anonymity.oss-cn-shanghai.aliyuncs.com/video/gongnengyanshi.mp4`,
				androidActiveVideo: `https://www.anonymity.ink:60/jiaocheng2/intsall.mp4`,
				activeVideoIndex: 0,
				current: 0,
				switchArr: [{
						type: 'ios',
						text: 'ios激活教程'
					},
					{
						type: 'android',
						text: 'android激活教程'
					},
				],
				selectedClientType: '',
				tutorialList: [{
						icon: yunIcon,
						text: '下载/安装/激活'
					},
					{
						icon: musicIcon,
						text: '功能演示'
					},
					{
						icon: smileIcon,
						text: '聊天记录备份/恢复'
					}
				]
			};
		},
		computed: {
			clientType() {
				//选择的设备，默认传进来的。之后以页面选择为准
				return this.selectedClientType || this.selectedClient
			},
			showVideo() {
				const activeVideoUrlKey = this.clientType === 'ios' ? ['IOSActiveVideo', 'funcDemo',
					'replyChartVideo'
				] : ['androidActiveVideo', 'funcDemo', 'replyChartVideo']

				return this[activeVideoUrlKey[this.activeVideoIndex]]
			}
		},
		methods: {
			changeTutorial(item, index) {
				this.$refs.popup.open()
				this.activeVideoIndex = index
			},

			handleClose() {
				this.$refs.popup.close()
			},
			radioChange({
				detail
			}) {
				console.log('detail', detail)
				this.selectedClientType = detail.value
				for (let i = 0; i < this.switchArr?.length; i++) {
					if (this.switchArr[i]?.type === detail?.value) {
						this.current = i
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-container {
		padding: 0 16rpx 38rpx;
		background: rgba(255, 255, 255, 0.72);
		margin: 0 24rpx 20rpx;
		height: 200rpx;
		border-radius: 8rpx;

		.video-title {
			background: url(@/static/image/index-page/video_tutorial.png) no-repeat 50% 50%;
			width: 122rpx;
			height: 30rpx;
			background-size: contain;
			padding: 16rpx 0;
		}

		.tutorial-container {
			display: flex;
			flex-direction: row;

		}

		.tutorial-item {
			width: 214rpx;
			height: 140rpx;
			margin-left: 16rpx;

			&:first-child {
				margin: 0;
			}



			.item-container {
				display: flex;
				width: 214rpx;
				height: 140rpx;
				background: url(@/static/image/index-page/cyan_bg.png) no-repeat 50% 50%;
				background-size: contain;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-left: 16rpx;
				font-size: 18rpx;
				// padding-top: 10rpx;

				&:first-child {
					margin: 0;
				}


				.item-container {
					width: 210rpx;
					height: 121rpx;
					box-sizing: border-box;
				}

				.icon-container {
					height: 96rpx;
					box-sizing: border-box;
					padding: 20rpx 0 9rpx;
				}

				.img-item {
					width: 60rpx;
					height: 60rpx;
					object-fit: contain;


				}
			}

			&.activeType {
				color: #fff;

				.item-container {
					background: url(@/static/image/index-page/pink_bg.png) no-repeat 50% 50%;
					background-size: contain;
				}
			}
		}
	}

	.videoMap {
		width: 98%;
		margin: 0 auto;
		padding: 36rpx 0;
		text-align: center;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.6);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;

		.switch-container {

			margin: 40rpx 0;

			.switch-title {
				text-align: left;
				height: 48rpx;
				line-height: 48rpx;
				margin-bottom: 20rpx;
				font-size: 32rpx;
			}

			.radio-container {
				display: flex;
				flex-direction: row;
				justify-content: center;

				.label-container {
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
			}
		}

		.video-box {
			box-sizing: border-box;
			width: 650rpx;
			// background: rgba(255, 255, 255, 0.6);
		}

		.icon-close {
			color: rgb(197 194 194);
			position: absolute;
			right: 0;
			top: 0;
			transform: translate(50%, -50%);
		}
	}
</style>