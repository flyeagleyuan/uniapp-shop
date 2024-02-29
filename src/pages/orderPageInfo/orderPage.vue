<template>
    <view  class="conster">   
  <view class="container">
    <uni-section class="mb-2"     title="支付激活码">
				<template v-slot:right>
                 TB32344743534  
				</template>
			</uni-section>
			<view class="examplePage">
      <uni-section class="mb-2"     title="订单编号">
				<template v-slot:right>
                   orderNo
				</template>
			</uni-section>
            <uni-section class="mb-2"    title="支付宝通道">
				<template v-slot:right>
                    channelCode
				</template>
			</uni-section>
            <uni-section class="mb-2"     title="支付通道订单号">
				<template v-slot:right>
                    channelOrderNo
				</template>
			</uni-section>
            <uni-section class="mb-2"    title="套餐名称">
				<template v-slot:right>
                    productName
				</template>
			</uni-section>
            <uni-section class="mb-2"     title="订单金额">
				<template v-slot:right>
                    amount
				</template>
			</uni-section>
            <uni-section class="mb-2"   title="支付类型">
				<template v-slot:right>
                    payType
				</template>
			</uni-section>
            <uni-section class="mb-2"     title="推广员名称">
				<template v-slot:right>
                    promoterName
				</template>
			</uni-section>
            <uni-section class="mb-2"    title="推广员手机号">
				<template v-slot:right>
                    promoterPhone
				</template>
			</uni-section>
            <uni-section class="mb-2"     title="支付时间">
				<template v-slot:right>
                    payTime
				</template>
			</uni-section>
            <uni-section class="mb-2"    title="支付手机号">
				<template v-slot:right>
                    payUserPhone
				</template>
			</uni-section>
            
            </view>
            </view>
            <view  @click="loginOut()">是否申请推广员资质</view>
      <!--</scroll-view>-->
        <!--<uni-popup ref="inputDialog" type="dialog">
                  <uni-popup-dialog :type="msgType"     style="color:green"   title="支付成功" content="请查看提交的订单!" @confirm="dialogConfirm"
                      @close="dialogClose"></uni-popup-dialog>
         </uni-popup> -->
    </view>
  </template>
  <script>
//   import {
//     canUselist
//   } from '../../../api/login'
  export default {
      data() {
             return {
                selectCheck:'',
                sexs: [{
					text: '是',
					value: 0
				}, {
					text: '否',
					value: 1
				}, ],
             }
          },
          onLoad() {
            
  
          },
          onShow(){
            
          
          },
         methods: {
          open() {
              this.$refs.popup.open('top')
          },
          close() {
              this.$refs.popup.close()
          },
        // 申请推广资质
     loginOut(){
    let  urlParams='1745008359148625921'
let externalLink = `https://www.baidu.com/?promoterId=${urlParams}`;
// 调用原生API进行跳转
if (typeof plus !== "undefined") { 
  plus.runtime.openURL({
    url: externalLink
  });
} else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { 
  window.location.href = externalLink;
} else { 
  console.log("不支持此操作");
}   
},
          //支付成功
          dialogConfirm(){
              uni.navigateTo({
              url: '/pages/orderPageInfo/orderPage'
              });
          },
          //当前的列表  
          goBackter(){
              this.$refs.inputDialog.open()
          },
          dialogClose(){
              this.$refs.inputDialog.close()
          },
          testTabClick(index) {
                  console.log(index)
                  this.tabIndex = index
              },
              onPageBlock(item,index){
                  this.navIndex = index;
  
              },
              onPaymoney(itemted,indexted){
                  this.payIndex = indexted;
  
  
              }
  
         }
  
  }
  </script> 
  <style   lang="scss"  scoped>
  .bannerimage{
      text-align: center;
      height: 360px;
      width: 90%;
      box-sizing: border-box;
       margin: 0px auto 0px;
       margin-top: 16px;
  }
    ::v-deep.uni-popup__error{
       color: #1890FF;
  }
  .examplePage{
   padding: 16rpx  24rpx;
  }
  .pageList{
     padding:24rpx  24rpx;
  }
  .btweenTop{
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  margin-top: 16px;
  margin-left: 14px;
  .left_text{
	  font-size:12px
	  }
	  .right_text{
        font-size:8px;
        height: 20px;
	    margin-right: 10px;
		min-height: 30rpx;
		max-height: 30rpx;
	  }
	  } 
  .pay_text{
      text-align: center;
        font-size: 16px;
      margin: 0 auto;
  }
  .activite {
      background-image: url('../../static/type_icon.png'); /* 这里的路径根据自己的情况进行调整 */
    width: 100%;
    height: 20vh;
    color:#fff;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .activiteted{
     background-image: url('../../static/select_paymoney.png'); 
    width: 100%;
    height: 20vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .patmoney_icon{
      width: 30px;
      height: 20px;
      margin-left: 10px;
      margin-top: 12px;
  
  }
  
  .conster{
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    right: 0
  }
  .display_icon{
      display: inline-block;
      width: 28%;
       margin-left: 12px;
       border-radius: 8px;
      background-color: #eee;
      height: 86rpx;
      .h5_text{
          font-size: 12px;
          margin-left:-8px;
          margin-top: 6px;
      }
      
      .h3_text{
          margin-left:-8px;
          font-size: 8px;
      }
  }
  .top{
    width: 100%;
    text-align: center;
    color: #fff;
    line-height: 45px;
    height: 45px;
    background: linear-gradient(121deg, #94C7FE -24%, #1890FF 96%);
  }
  .mb-10 {
          margin-bottom: 10px;
      }
      .between{
  display: flex;
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
  
      } 
      .postion_app{
          position:relative;
      }
      .postion_apple{
        position: absolute;
        z-index: 13;
         margin-top: -64px;
          margin-left: 16px;
          color: #fff;
          font-family: PingFangSC-Medium, sans-serif;
         
      }
      .apple_icon{
       width: 36px;
       height: 36px;
       
      }
      .apple_text{
          font-family: PingFangSC-Medium, sans-serif; 
          margin-left: 10px;
           font-size: 16px;
       }
  
      .tab-box{
          display: flex;
          .tab-item{
              flex-shrink: 0;
              padding: 24rpx;
              position: relative;
              transition: all 0.2s linear;
              &::after{
                  // transition: all 0.2s linear;
                  // transform: translateX(-50%) scaleX(0);
                  content: '';
                  // width: 50%;
                  width: 160px;
  
                  position: absolute;
                  // left: 50%;
                  bottom: 20rpx;
                  width: 100%;
                  // background: url(@/static/banner.png) no-repeat center center fixed;
                  //  background-image: url("../../static/select_paymoney.png") no-repeat center center;
                   background-color: #1890FF;
                  border-radius: 4rpx;
              }
              &.active{
                  &::after{
                      content: '';
                      // width: 50%;
                      width: 160px;
                      position: absolute;
                      // left: 50%;
                      // transform: translateX(-50%) scaleX(1);
                      bottom: 20rpx;
                      border-radius: 8px;
                      height: 40px;
                      background-color: green($color: #000000);
                      // border-bottom: 6rpx solid red;
                  }
              }
          }
      }
  
      .padtom {
    width: 100%;
    margin: 0 auto;
    height: 168rpx;
    text-align: center;
    position: fixed;
    z-index: 22;
    bottom: 0rpx;
    // background-color: #fff;
    color: #fff;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.71);
  
    .logbutton {
    color: #f8f8f8;
    background-color: #1890FF;
    width: 92%;
    margin: 0 auto;
    height: 84rpx;
    margin-top: 32rpx;
    border-radius: 42rpx;
    transition: background-color 0.3s linear, border 0.3s linear;
  }
  }
  
  //组件切换
  //切换不同的设备
  .demo-uni-col {
          height: 36px;
          border-radius: 5px;
      }
  
      .dark_deep {
          background-color: #99a9bf;
      }
  
      .dark {
          background-color: #d3dce6;
          padding: 10px;
      }
  
      .light {
          background-color: #e5e9f2;
          margin-left: 8px;
          padding: 10px ;
      }
      .banner_list{
           width: 160px;
          margin-left: 4px;
          height:72px;
      }
      .light_image{
          margin-left: 8px;
          height:72px;
  
      }
      .light_right {
          background-color: #e5e9f2;
          padding: 10px;
      }
  
  .marginLeft{
      margin-left: 20px !important;
  
  }
  .betwen{
  justify-content: space-between;
  display: flex;
  }
  
  .pad_text{
  font-size: 14px;
  line-height:24px;
  font-weight: 600;
  font-family: "Microsoft-YaHei','SimSun', 'SimHei','KaiTi','Arial','Times-New-Roman";
  flex:1;
   margin-top: -10px;
  display: inline-block;
  }
  .back_gray{
      width: 86%;
      padding: 20px;
      margin: 0 auto;
      text-align: center;
       border-radius:8px;
   background: #f7f7f7;
      padding: 20px;
      color: #888;
      font-weight: bold;
      font-size: 12px;
      margin-top: 10px;
      line-height: 20px;
  }
  .barrage-box {
          // border: 1rpx solid red;
          padding: 0 10rpx;
          width: 90vw;
          transform-origin: 65vw 75vw;
          transform: rotate(0deg);
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
          // background-color: #000;
          z-index: 3;
          }
       
          .text {
              width: 200vw;//调整文字显示
              font-size: 12px;
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
  
  
  
  