// import { login, loginOfOpenId } from '@/api/login.js'
// import { login, loginOfOpenId } from '../../api/login'




const request = (config) => {
    // 拼接完整的接口路径
    // let token_value = uni.getStorageSync('accessTokenPage')
    config.url = 'http://192.168.3.21:8080' + config.url //dev的账号
        // config.url =
        //     'https://med-api-80112-6-1322410562.sh.run.tcloudbase.com/api' + config.url //线上的地址
    // config.header = {
    //     'access-token': token_value,
    // }
    // if (!config.data) {
    //     config.data = {}
    // }
    // let promise = new Promise(function(resolve, reject) {
    //     uni
    //         .request(config)
    //         .then(async(responses) => {
    //             if (responses[0]) {
    //                 reject({ message: '网络超时' })
    //             } else {
    //                 const response = responses[1]

    //                 if (response.statusCode == 200) {
    //                     resolve(response.data)
    //                     return
    //                 }
    //                 if (response.statusCode == 401) {
    //                     const params = {
    //                         openId: uni.getStorageSync('openId'),
    //                         memberId: uni.getStorageSync('member_id'),
    //                         token: uni.getStorageSync('accessTokenPage'),
    //                     }
    //                     loginOfOpenId(params).then((res) => {
    //                         // if (res.code == 10002) {
    //                         if (res.code === 0) {
    //                             const { openID, id, accessToken } = res.data
    //                             uni.setStorageSync('openId', openID)
    //                             uni.setStorageSync('member_id', id)
    //                             uni.setStorageSync('accessTokenPage', accessToken)
    //                             uni.switchTab({
    //                                 url: '/pages/index/index',
    //                                 animationType: 'slide-in-left',
    //                             })
    //                             return
    //                         }
    //                     })
    //                     resolve(response.data)
    //                     return
    //                 }

    //                 if (response.data.code == 10002) {
    //                     uni.removeStorageSync('isLoginOut')
    //                     uni.removeStorageSync('userMobile')
    //                     uni.removeStorageSync('accessTokenPage')
    //                     uni.switchTab({
    //                         url: '/pages/index/index',
    //                         animationType: 'slide-in-left',
    //                     })
    //                     return
    //                 }

    //                 reject(response.data)
    //             }
    //         })
    //         .catch((error) => {
    //             reject(error)
    //         })
    // })
    // return promise
}



export default request