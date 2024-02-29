<template>
	<view class="membership-container">
		<view class="package-title"></view>
		<view v-if="currentBusinessList.length">

			<uni-swiper-dot :info="currentBusinessList" :current="navIndex" field="content" mode="dot">
				<swiper class="swiper-box">
					<swiper-item v-for="(item, index) in currentBusinessList" :key="index"
						:class="navIndex == index ? 'activite' : ''" class="swiper-item"
						@click="changeBusinessType(item,index)">
						<view class="package-bg"></view>
						<uni-row class="demo-uni-row" width="100%">
							<view class="package-productName">{{item.productName}}</view>
							<view class="package-price"><text>￥</text>{{item.productPrice}}<text>元</text>
							</view>
							<view class="forever-container" v-if="item.isForeverProduct">永久</view>
							<view class="package-deadline" v-else>
								{{item.productYears?item.productYears+'年':''}}
								{{item.productMonths?item.productMonths+'月':''}}
								{{item.productDays?item.productDays+'日':''}}内使用
							</view>
						</uni-row>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>

		</view>
		<view v-else class="no-data">暂无数据</view>
	</view>
</template>

<script>
	export default {
		name: 'BusinessComponent',
		props: {
			businessList: {
				type: Array,
				default () {
					return []
				}
			},
			navIndexType: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				navIndex: 0
			}
		},
		computed: {
			currentBusinessList() {
				const clientTypeArr = ['ios', 'android']

				return this.businessList?.filter(item => {
					return item.appType === clientTypeArr[this.navIndexType]
				}) || []
			}
		},
		methods: {
			//商品切换
			changeBusinessType(item, index) {
				this.$emit('changeBusinessType', item, index)
				this.navIndex = index;
				// this.pageInfo = item
			},
		}
	}
</script>

<style lang="scss" scoped>
	//会员套餐
	.membership-container {
		padding: 0 16rpx 38rpx;
		background: rgba(255, 255, 255, 0.72);
		height: 314rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		color: #e3284f;
		margin: 40rpx 24rpx 0;

		.package-title {
			background: url(@/static/image/index-page/hui_yuan.png) no-repeat 50% 50%;
			width: 122rpx;
			height: 30rpx;
			background-size: contain;
			padding: 16rpx 0;
		}


	}

	.activite {
		// background-image: url('../../static/blueIcon.png'); 
		width: 28%;
		height: 20vh;
		color: #fff;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.package-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background: url(@/static/image/index-page/inactive_pay_bg.png) no-repeat 50% 50%;
		background-size: cover;
	}

	.swiper-item {
		display: inline-block;
		box-sizing: border-box;
		width: 313rpx !important;
		height: 168rpx !important;
		position: relative;
		opacity: 0.68;
		// margin-left: 16rpx;

		&.activite {
			opacity: 1;
			border: none;

			.package-bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 8px;
				background: url(@/static/image/index-page/pay_bg.png) no-repeat 50% 50%;
				background-size: cover;
			}
		}

		.package-productName {
			padding: 22rpx 24rpx 12rpx;
			font-size: 30rpx;
			line-height: 30rpx;
		}

		.package-price {
			font-size: 48rpx;
			line-height: 48rpx;
			text-align: center;

			text {
				font-size: 18rpx;
			}
		}

		.package-deadline {
			font-size: 20rpx;
			text-align: center;
		}
	}

	.no-data {
		width: 100%;
		height: 100%;
		display: flex;
		color: #000;
		justify-content: center;
		align-items: center;
		;
	}

	.swiper-box {
		height: 224rpx;

		&:first-child {
			margin-left: 0;
		}
	}

	.forever-container {
		text-align: center;
	}
</style>