
import  request from '../../src/utils/http'
import  getEnvironmentUrl from '../../src/utils/environment'
//缓存的数据
const getToken = (data) => {
    let url = getEnvironmentUrl(2)
    return request({
      completeUrl: url,
      data: data || {},
      method: 'GET'
    })
    // return request({completeUrl:'https://dev-tripartite.rokin.cn/wxMiniApp/wx4ba4b6469e0b4d4c/loginByCode',data:data ||{},method:'GET'})//dev
    // return request({completeUrl:'https://tripartite-uat.rokin.cn/wxMiniApp/wx4ba4b6469e0b4d4c/loginByCode',data:data ||{},method:'GET'})//uat
  }


//账号注销
const authLogin = (data) => {
    return request({
      url: 'auth/smsRegister',
      data: data || {}
    })
  }

  //套装的数据
const defaultLoginImage = (data) => {
        return request({
            method: 'get',
            url: '/wechatplug/product/list',
            data: data,
        })
    }
    //选择安卓和ios的链接类型切换下载
    const canUselist = (data) => {
        return request({
            method: 'get',
            url: '/wechatplug/download/canUselist',
            data: data,
        })
    }
//创健支付生成二维码
    const createOrder = (data) => {
        return request({
            method: 'post',
            url: '/wechatplug/order/createOrder',
            data: data,
        })
    }
    //二维码生成的状态
    const queryOrderState =order => {
        return request({
            method: 'post',
            url: '/wechatplug/order/queryOrderState/${order}',
            data: data,
        })
    }

export {
    authLogin,
    getToken,
    defaultLoginImage,
    canUselist,
    createOrder,
    queryOrderState,

}