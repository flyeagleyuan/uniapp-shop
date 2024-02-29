<template>
	<view class="pay-container">
		<view>请截屏保存，到微信中扫一扫识别支付码，进行微信支付</view>
		<view><img :src="qrCodeUrl" alt="" /></view>
	</view>
</template>

<script>
	import {
		fetchWXPayOrder
	} from "@/api/pay/index.js"
	import {
		getPayDetail
	} from "@/api/pay/detail.js"
	import QRCode from 'qrcode'; //二维码成插件
	import {
		url2json
	} from "@/utils/url2json.js"

	const queryObj = url2json(location.search)
	const promoterId = queryObj?.promoterId
	const from = queryObj?.from

	export default {
		name: 'WXPayPage',
		data() {
			return {
				qrCodeUrl: '',
				orderId: '',
				timer: null
			}
		},
		onLoad() {
			this.getPayQRCode()
		},
		methods: {
			async getPayQRCode() {

				const productId = queryObj?.productId
				if (!productId) return
				const {
					code,
					data
				} = await fetchWXPayOrder({
					productId: productId,
					payUserPhone: queryObj?.payUserPhone

				})
				if (code === 200) {
					this.orderId = data?.orderId
					this.activationCode = data?.activationCode
					location.href = data?.payQRcode
					// this.generateQRCode(data?.payQRcode)
				}

			},
			generateQRCode(text) {
				console.log(1111111, text)

				if (!from) {
					location.href = promoterId ?
						`${text}?promoterId=${promoterId}&orderId=${this.orderId}&actcode=${this.activationCode}` :
						`${text}?orderId=${this.orderId}&actcode=${this.activationCode}`
				} else {

					location.href = promoterId ?
						`${text}?promoterId=${promoterId}&orderId=${this.orderId}&actcode=${this.activationCode}&from=${from}` :
						`${text}?orderId=${this.orderId}&actcode=${this.activationCode}&from=${from}`
				}

				// QRCode.toDataURL(text, (err, url) => {
				// 	if (err) {
				// 		console.error(err);
				// 		return;
				// 	}

				// 	this.qrCodeUrl = url;
				// 	if (this.orderId) {
				// 		this.timer = setInterval(async () => {
				// 			const {
				// 				code,
				// 				data
				// 			} = await getPayDetail({
				// 				orderId: this.orderId
				// 			})
				// 			console.log('pay res', data)
				// 			if (data?.payState === 'payd') {
				// 				clearInterval(this.timer)
				// 				if (!from) {
				// 					uni.navigateTo({
				// 						url: promoterId ?
				// 							`/pages/payMoneypage/detail/index?promoterId=${promoterId}&orderId=${this.orderId}&actcode=${this.activationCode}` :
				// 							`/pages/payMoneypage/detail/index?orderId=${this.orderId}&actcode=${this.activationCode}`
				// 					})
				// 				} else {
				// 					uni.navigateTo({
				// 						url: promoterId ?
				// 							`/pages/payMoneypage/detail/index?promoterId=${promoterId}&from=${from}&orderId=${this.orderId}&actcode=${this.activationCode}` :
				// 							`/pages/payMoneypage/detail/index?from=${from}&orderId=${this.orderId}&actcode=${this.activationCode}`
				// 					})
				// 				}
				// 			}
				// 		}, 5000)
				// 	}

				// });
			},
		},
		beforeDestroy() {
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss" scoped>
	.pay-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>