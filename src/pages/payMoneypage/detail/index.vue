<template>
	<view class="payDetail-container">
		<view class="active-code">
			<view class="text-content">
				<view class="border-bottom">激活码</view>
				<view><text>{{encryptionCode || '-'}}</text></view>
				<button size="mini" plain="true" v-clipboard:copy="activeCode"
					v-clipboard:success="()=>handleClipRes('success')"
					v-clipboard:error="()=>handleClipRes('error')">复制</button>
			</view>
		</view>
		<view class="content-container">
			<uni-card is-shadow>
				<uni-row v-for="( order, index) in orderData" :width="730" :key='index'>
					<uni-col :span="12">{{order.label}}</uni-col>
					<uni-col :span="12" class="text-right">{{order.value}}</uni-col>
				</uni-row>
			</uni-card>
			<uni-card is-shadow>
				<uni-row v-for="( order, index) in priceData" :key="index" :width="730">
					<uni-col :span="12">{{order.label}}</uni-col>
					<uni-col :span="12" class="text-right">{{order.value}}</uni-col>
				</uni-row>
			</uni-card>
		</view>
		<view class="payDetail-footer" v-if="showFooterBanner" @click="goPage">
		</view>
	</view>
</template>

<script>
	import {
		getPayDetail
	} from "@/api/pay/detail.js"
	import {
		url2json
	} from "@/utils/url2json.js"
	import {
		encryptionCode
	} from "@/utils/encryptionCode.js";

	export default {
		name: 'payDetail',
		data() {
			return {
				activeCode: '',
				encryptionCode: '',
				promoterId: '',
				showPromoterBanner: false,
				detailData: {},
				from: '',
				orderData: [{
						key: 'orderNo',
						label: '订单编号',
						value: ' '
					},
					// {
					// 	key: 'channelCode',
					// 	label: '支付通道订单号',
					// 	value: ' '
					// },
					{
						key: 'payTime',
						label: '支付时间',
						value: ' '
					},
					{
						key: 'payType',
						label: '支付方式',
						value: ' '
					},
					{
						key: 'payUserPhone',
						label: '支付手机号',
						value: ' '
					},
				],
				priceData: [{
						key: 'productName',
						label: '套餐名称',
						value: ' '
					},
					{
						key: 'amount',
						label: '订单金额',
						value: ' '
					},
					{
						key: 'promoterName',
						label: '推广员姓名',
						value: ' '
					},
					{
						key: 'promoterPhone',
						label: '推广员手机号',
						value: ' '
					},
				]
			}
		},
		async created() {
			const queryObj = url2json(location.search)
			this.showPromoterBanner = queryObj?.promoterId
			this.promoterId = queryObj?.promoterId
			this.from = queryObj?.from

			this.activeCode = queryObj?.actcode
			this.encryptionCode = encryptionCode(queryObj?.actcode)

			if (queryObj?.orderId) {

				const {
					code,
					data
				} = await getPayDetail({
					orderId: queryObj?.orderId
				})
				if (code == 200) {
					this.handleDetailData(data)
				}
			}

		},
		computed: {
			showFooterBanner() {
				// return !(this.from !== 'index' && this.promoterId)
				return this.from == 'index'
			}
		},
		methods: {
			handleDetailData(data) {
				this.orderData = this.orderData.map(item => {
					const payTypeMap = {
						wxqrcode: '微信支付',
						aliqrcode: '支付宝支付'
					}
					return {
						...item,
						value: item.key === 'payType' ? payTypeMap[data[item.key]] : data[item.key]
					}
				})
				this.priceData = this.priceData.map(item => {
					return {
						...item,
						value: data[item.key]
					}
				})

			},
			handleClipRes(type) {
				if (type === 'success') {
					uni.showToast({
						title: '复制成功',
						icon: 'success',
						duration: 2000
					})
				}

				if (type === 'error') {
					console.log('error')
					uni.showToast({
						title: '复制失败',
						icon: 'error',
						duration: 2000
					})
				}
			},
			goPage() {
				//跳转到注册页
				//navigateToMiniProgram手机端测试没问题，pc上可能有错误提示，如果想pc测试可用下面的逻辑
				const ip = process.env.VUE_APP_API_BASE_URL
				location.href = this.promoterId ?
					`${ip}:70/pages/register/index?promoterId=${this.promoterId}` :
					`${ip}:70/pages/register/index`

			}
		}
	}
</script>

<style lang="scss" scoped>
	.payDetail-container {
		background: #fff;

		.active-code {
			width: 100%;
			height: 458rpx;
			box-sizing: border-box;
			background: url(@/static/image/detail-page/bannerdetail.png) no-repeat 50% 50%;
			background-size: contain;
			padding: 120rpx 90rpx;

			.text-content {
				color: #fff;
				font-size: 48rpx;
				font-weight: bold;

				width: 264rpx;
				text-align: center;

				.border-bottom {
					border-bottom: 1px solid #fff;
					display: inline-block;
					width: 264rpx;
					line-height: 75rpx;
					text-align: center;
				}

				view {
					text {
						font-size: 30rpx;
						line-height: 70rpx;
						font-weight: bold;
						color: #ee392e;
					}
				}

				button {
					color: #03b6f0;
					width: 140rpx;
					height: 46rpx;
					line-height: 46rpx;
					background: rgba(255, 255, 255, 0.62);
					border: none;

				}
			}
		}

		.payDetail-footer {
			width: 100%;
			height: 288rpx;
			background: url(@/static/image/detail-page/detail_page.png) no-repeat 50% 50%;
			background-size: contain;
		}
	}

	.text-right {
		text-align: right;
		color: #B5B2BC;
	}
</style>