<template>
	<view class="conster">
		<!-- 	<view class="bannerimage" @click="goBackter">
			<image style="width:100%;height:100%;" src="/static/banner.png"></image>
		</view> -->
		<scroll-view scroll-y="true">
			<view class="padTop">
				<uni-row class="demo-uni-row">
					<uni-col :span="2">
						<uni-icons type="sound" style="color: #fff" size="24"></uni-icons>
					</uni-col>
					<uni-col :span="8">
						<view class="pad_text">公告提示：</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="barrage-box">
				<view class="notice-container">
					<view class="text">
						{{showNoticeContent}}
					</view>
				</view>
			</view>
			<!-- //商品 -->
			<BusinessCom :businessList="businessList" :navIndexType="navIndexType"
				@changeBusinessType="changeBusinessType"></BusinessCom>

			<!-- 支付 -->
			<view class="pay-container">
				<view class="pay-title"></view>
				<view v-for="(itemted,indexted) in getPaymoney" :key="indexted" class="display_iconPay"
					@click="onPaymoney(itemted, indexted)" :class="payIndex == indexted ? 'activiteted' : ''">
					<view class="pay-way-bg"></view>
					<view class="pay-way-content">
						<view class="way-content-container">
							<image :src="itemted.payimg" class="patmoney_icon"></image>
							<view class="pay_text">{{ itemted.name }}</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 视频教程 -->
			<VideoTutorial></VideoTutorial>

			<!-- 下载模块 -->
			<DownloadApp></DownloadApp>
		</scroll-view>
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="请填写正确的手机号获取激活码" :value="phoneNumber"
				placeholder="请输入正确的手机号" @confirm="dialogInputConfirm">
			</uni-popup-dialog>
		</uni-popup>

	</view>
</template>
<script>
	import {
		defaultLoginImage,
		canUselist,
		createOrder
	} from '../../../api/login'
	import {
		fetchWXPayOrder
	} from "@/api/pay/index.js"
	import {
		fetchNoticeList
	} from "@/api/index/index.js"
	import {
		url2json
	} from "@/utils/url2json.js"
	import BusinessCom from "./components/BusinessComponent.vue"
	import VideoTutorial from "./components/VideoTutorial.vue"
	import DownloadApp from './components/DownloadApp.vue';

	export default {
		data() {
			return {
				phoneNumber: '',
				current: 0,
				showNoticeContent: '',
				nvueWidth: "0",
				typePayNamme: "",
				pageInfo: '',
				tabIndex: 0,
				payIndex: 0,
				navIndexType: 0,
				clientList: ['ios', 'android'],
				businessList: [],
				getPaymoney: [{
					name: "支付宝",
					payimg: '../../static/image/index-page/pay_bar.png'
				}, {
					name: "微信支付",
					payimg: '../../static/image/index-page/weixin_icon.png'

				}],
			}
		},
		components: {
			BusinessCom,
			VideoTutorial,
			DownloadApp
		},
		onLoad() {
			this.handleNotice()
		},

		async onShow() {
			this.getList()
		},
		methods: {

			//获取公告列表
			async handleNotice() {
				const {
					code,
					rows
				} = await fetchNoticeList()
				if (code === 200) {
					this.showNoticeContent = rows[0]?.noticeContent || ''
				}
			},

			//手机号验证
			doInput(val) {
				var regPhone = (
					/^1[3,4,5,6,7,8,9][0-9]{9}$/); //手机号码
				if (!regPhone.test(val)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					});
					return false
				} else {
					return true
				}
			},
			//当前的列表  
			getList() {
				uni.showLoading({
					title: '加载中...'
				})
				let params = {
					productType:2,
					pageSize: 10,
					pageNum: 1
				}
				defaultLoginImage(params)
					.then((res) => {
						if (res.code == '200') {
							this.businessList = res.rows
							//ios 的第一个套餐
							this.pageInfo = this.businessList?.filter(item => {
								return item.appType === 'ios'
							})[0]

						} else {
							uni.showToast({
								duration: 2000,
								title: res?.msg,
								icon: 'none'
							})
						}
					})

					.catch((err) => {
						uni.showToast({
							title: err?.message ?? '接口请求失败，请联系管理员',
							icon: 'none'
						})
					})
					.finally(() => {
						uni.hideLoading()
						uni.stopPullDownRefresh()
					})
			},

			//类型
			changeClientType(item, index) {
				this.navIndexType = index
				const pageType = item.downloadAdd
			},
			//商品切换
			changeBusinessType(item, index) {

				this.pageInfo = item
			},
			async dialogInputConfirm(phone) {

				if (this.doInput(phone)) {

					const queryObj = url2json(location.search)
					const from = queryObj?.from
					const promoterId = queryObj?.promoterId || queryObj?.userId
					if (this.payIndex == 0) {
						//支付宝
						const url = promoterId ?
							`${location.hostname}/prod-api/wechatplug/order/createAliOrder/${this.pageInfo?.productId}?promoterId=${ promoterId }&payUserPhone=${phone}` :
							`${location.hostname}/prod-api/wechatplug/order/createAliOrder/${this.pageInfo?.productId}?payUserPhone=${phone}`;

						location.href = `https://${from ? url + '&from=' + from : url}`
					} else {
						// 微信支付
						const params = this.handleParams(this.pageInfo?.productId, phone)
						const {
							code,
							data
						} = await fetchWXPayOrder(params)

						if (code === 200) {
							this.orderId = data?.orderId
							this.activationCode = data?.activationCode
							location.href = data?.payQRcode
						}
					}
				}
			},
			handleParams(productId, phone) {
				const queryObj = url2json(location.search)
				const from = queryObj?.from
				const promoterId = queryObj?.promoterId || queryObj?.userId

				return {
					payUserPhone: phone,
					productId,
					promoterId,
					from
				}

			},
			//创建支付功能
			onPaymoney(itemted, indexed) {
				this.typePayNamme = itemted.name
				this.payIndex = indexed;
				this.$refs.inputDialog.open()
			},

		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .uni-easyinput__content-textarea {
		line-height: 1.5;
		font-size: 28rpx;
		height: 20rpx;
		min-height: 20rpx;
		min-height: 20rpx;
		width: auto;
	}

	// .bannerimage {
	// 	text-align: center;
	// 	height: 180px;
	// 	width: 100%;
	// 	box-sizing: border-box;
	// 	margin: 0px auto 0px;
	// }

	// .activite {
	// 	width: 28%;
	// 	height: 20vh;
	// 	color: #fff;
	// 	background-size: cover;
	// 	background-repeat: no-repeat;
	// 	background-position: center;
	// }

	.activiteted {
		height: 20vh;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.patmoney_icon {
		display: inline-block;
		width: 78rpx;
		height: 70rpx;

	}

	.pay_text {
		display: inline-block;
		margin-left: 10px;
		position: absolute;
	}

	.conster {
		width: 100%;
		left: 0;
		top: 0;
		right: 0;
		background: url(@/static/image/background-index.png) no-repeat;
		background-size: 100% 100%;
		background-color: #AFCEFE;

		.uni-section {
			background: transparent;
		}
	}

	//top
	.padTop {
		margin: 12rpx 24rpx
	}

	//支付方式
	.pay-container {
		padding: 0 16rpx 38rpx;
		background: rgba(255, 255, 255, 0.72);
		margin: 20rpx 24rpx;
		height: 264rpx;
		box-sizing: border-box;
		border-radius: 8rpx;

		//支付功能
		.display_iconPay {
			display: inline-block;
			position: relative;
			width: 313rpx;
			height: 168rpx;
			border-radius: 10rpx;

			&:nth-child(3) {
				margin-left: 12px;
			}

		}

		.pay-title {
			background: url(@/static/image/index-page/pay_way.png) no-repeat 50% 50%;
			width: 122rpx;
			height: 30rpx;
			background-size: contain;
			padding: 16rpx 0;
		}

		.pay-way-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 310rpx;
			height: 174rpx;
			border-radius: 8px;
			background: url(@/static/image/index-page/pay_way_inactive.png) no-repeat 50% 50%;
			background-size: contain;
		}

		.activiteted {
			.pay-way-bg {
				background: url(@/static/image/index-page/pay_way_active.png) no-repeat 50% 50%;
				background-size: contain;
			}
		}

		.pay-way-content {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 0 30rpx;

			.way-content-container {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
			}

			.pay-text {
				marign-left: 50rpx;
			}
		}
	}

	.top {
		width: 100%;
		text-align: center;
		color: #fff;
		line-height: 45px;
		height: 45px;
		background: linear-gradient(121deg, #94C7FE -24%, #1890FF 96%);
	}


	.pad_text {
		font-size: 14px;
		line-height: 24px;
		font-weight: 600;
		font-family: "Microsoft-YaHei','SimSun', 'SimHei','KaiTi','Arial','Times-New-Roman";
		flex: 1;
		margin-top: -10px;
		display: inline-block;
		color: #fff;
	}

	.barrage-box {
		margin: 0 24rpx;
		box-sizing: border-box;
		transform-origin: 65vw 75vw;
		transform: rotate(0deg);
		white-space: nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
	}

	.notice-container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		transform-origin: 65vw 75vw;
		transform: rotate(0deg);
		white-space: nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 30rpx;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.text {
		width: calc(100% - 32rpx); //调整文字显示
		height: 60rpx;
		line-height: 60rpx;
		font-size: 12px;
		padding: 0 20rpx;
		color: #000;

		animation: aniMove 14s linear infinite;
		animation-fill-mode: forwards;
	}

	/* 文字滚动 */
	@keyframes aniMove {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-100%);
		}
	}
</style>