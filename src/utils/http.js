// import getEnvironmentUrl from '@/utils/environment.js'
import getEnvironmentUrl from '../../src/utils/environment'
const baseUrl = process.env.VUE_APP_API_BASE_URL + '/prod-api/'

// let token_value = uni.getStorageSync('accessTokenPage')
let request = function(data) {
	uni.showLoading({
		title: '加载中~'
	});
	let promise = new Promise((resolve, reject) => {

		let devBaseUrl = getEnvironmentUrl(1)

		let url = data.completeUrl ? data.completeUrl : baseUrl + data.url
		uni.request({
			url,
			data: data.data || {},
			method: data.method || 'POST',
			header: {
				'content-type': data.type ||
					'application/json;charset=UTF-8',
				'content-language': 'zh_CN',
				'Authorization': "Bearer " + uni.getStorageSync('token'),
				clientId: '428a8310cd442757ae699df5d894f051', //;拼接携带的参数
			},
			success: function(res) {
				uni.hideLoading();
				if (res?.data?.msg?.indexOf('oauth.invalid.token') > -1 ||
					res?.data?.msg?.indexOf('authorization fail') > -1) {
					if (uni.getStorageSync('refreshToken')) {
						uni.request({
							url: devBaseUrl + 'idp/auth/refreshToken',
							data: {
								// clientSecret: 'admin',
								// clientId: '428a8310cd442757ae699df5d894f051',//;拼接tokin
								clientId: uni.uni.getStorageSync('clientIdPage'),
								refreshToken: uni.getStorageSync('refreshToken')
							},
							method: 'POST',
							header: {
								'content-type': 'application/json;charset=UTF-8',
								'Authorization': "Bearer " + uni.getStorageSync('token'), //之前的tokin
							},
							success: function(msg) {
								if (msg.data.success) {
									uni.setStorageSync('token', msg.data.data.accessToken)
									var pages = getCurrentPages(); //获取所有页面的数组对象
									var currPage = pages[pages.length - 1]; //当前页面
									uni.redirectTo({
										url: '/' + currPage.__route__
									})
								} else {
									uni.navigateTo({
										url: '/pages/Login',
									});
								}
							},
							fail: function(fail) {
								uni.showToast({
									title: '网络错误！',
									icon: 'none',
								});
								reject(fail);
								uni.hideLoading();
							}
						})
					} else {
						uni.navigateTo({
							url: '/pages/Login',
						});
					}
				} else {
					resolve(res.data);
					console.log('接口', url, '参数', data.data, '--接口返回--', res.data)
				}
			},
			fail: function(err) {
				uni.hideLoading();
				uni.showToast({
					title: '网络错误！',
					icon: 'none',
				}); //接口访问失败
				reject(err);
			}
		})
	});
	return promise;
}

// 上传文件
export const uploadRequest = function(data) {
	let promise = new Promise((resolve, reject) => {
		uni.uploadFile({
			//url: data.completeUrl + '?auth_token=' + data.token,
			url: data.completeUrl,
			filePath: data.imageUrl,
			name: 'file',
			header: {
				Authorization: "Bearer " + uni.getStorageSync('token'),
				"Content-Type": "multipart/form-data",
			},
			success: (res => {
				const data = JSON.parse(res.data);
				resolve(data);
			}),
			fail: function(err) {
				uni.showToast({
					title: '网络错误！',
					icon: 'none',
				}); //接口访问失败
				reject(err);
			}
		})
	});
	return promise;
}
export default request