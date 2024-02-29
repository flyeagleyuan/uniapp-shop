<template>
  <view  class="conster">
    <view class="top" > 
      支付功能
       </view> 
 <scroll-view scroll-y="true">
   <view  class="padTop">
        <uni-row  class="demo-uni-row">
            <uni-col :span="2">
     <uni-icons type="sound" size="24"></uni-icons>
    </uni-col>
    <uni-col :span="8">
       <view class="pad_text">公告提示：</view>
    </uni-col>
    </uni-row>
        </view>
       <view class="barrage-box">
  <view class="text">请保持微信更新的最新版请保持更新微密友最新版。 警惕！！盗版猖獗，以低价为诱惑收割用户，无任何保障，我们将不定期启动盗版检查，届时使用我们家的盗版用户将无法正常使用，为保证长期更新使用请支持我们。打击盗版 注意:请及记住永久备用联系邮箱zinssseucmc11@gmail.com
</view>
</view>
<uni-section title="支付功能" type="line">
</uni-section>
    <view class="pay_text">支持支付宝,微信支付可截图保存</view>
    <view   class="bannerimage"   @click="goBackter"  >
	         <image   style="width:100%;height:100%;"    src="../../static/6c118b98f9e739488547a2696a7c9b98.jpeg"></image>
		   </view>
    </scroll-view>
      <uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog :type="msgType"     style="color:green"   title="支付成功" content="请查看提交的订单!" @confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup>
  </view>
</template>
<script>

import {
    queryOrderState,
    
  } from '../../../api/login'
export default {
    data() {
           return {
           
            
           }
        },
        onLoad() {
            axios.get('http://192.168.3.21:8080/wechatplug/product/list', {
                params: {
                pageSize:10,
                  pageNum:1
                },
            }).then(
                (res) => {
                    if (res.data.code === 200) {
                        const data=res.data.rows
                 this.getPagelist=data
                
                    }
                    
                }
            )

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
         // 点击按钮进行支付并查询支付状态
    async payAndQueryStatus(orderId) {
      try {
        const res = await uni.login(); // 登录操作，获取code等必要参数
        
        // 构造请求参数
        const params = {
          order_id: orderId,
          code: res.code,
          // ...其他必要参数
        };
        
        // 发起POST请求，调用后台接口
        const result = await request({
          url: '/api/pay', // 后台接口地址
          method: 'post',
          data: params
        });
        
        if (result && result.status === 200) {
          console.log('支付成功');
          
          // 此处可以添加更多业务逻辑，比如展示支付成功界面或者重新拉取最新的支付状态
        } else {
          console.error('支付失败');
        }
      } catch (err) {
        console.error('支付错误', err);
      }
    },
    
    // 定期查询支付状态
    queryPaymentStatus() {
      setInterval(() => {
        this.checkPaymentStatus();
      }, 5000); // 每隔5秒查询一次支付状态
      
      // 初始化第一次查询
      setTimeout(() => {
        this.checkPaymentStatus();
      }, 1000); // 1秒后开始查询
    },
    
    checkPaymentStatus() {
      // 调用后台接口查询支付状态
      // 这里省略具体的请求代码，只保留关键部分
      request({
        url: '/api/payment_status', // 后台接口地址
        method: 'get'
      }).then((res) => {
        if (res && res.status === 200) {
          console.log('当前支付状态为：', res.data.status);
          
          // 根据不同的支付状态进行相应的处理
          switch (res.data.status) {
            case 'success':
              // 支付成功的处理逻辑
              break;
            
            case 'pending':
              // 支付未完成的处理逻辑
              break;
              
            case 'failed':
              // 支付失败的处理逻辑
              break;
              
            default:
              // 默认情况下的处理逻辑
              break;
          }
        } else {
          console.error('查询支付状态失败');
        }
      }).catch((err) => {
        console.error('查询支付状态错误', err);
      });
    },

  //支付状态实时查询
          //查找支付状态
        // queryOrderState
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
        },


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

.padTop{
padding: 12rpx 16rpx;
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
    background-image: url('../../static/select_paymoney.png'); /* 这里的路径根据自己的情况进行调整 */
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
  max-height: 100vh;
  left: 0;
  top: 0;
  right: 0;
  background-color: #fff;
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
				content: '';
                width: 160px;
				position: absolute;
				bottom: 20rpx;
                width: 100%;
                 background-color: #1890FF;
				border-radius: 4rpx;
			}
			&.active{
				&::after{
					content: '';
                    width: 160px;
					position: absolute;
					bottom: 20rpx;
                    border-radius: 8px;
                    height: 40px;
                    background-color: green($color: #000000);
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
margin-top: 16rpx;
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
<style>
::v-deep.uni-popup__error{
     color: #1890FF;
}
</style>



