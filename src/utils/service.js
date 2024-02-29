import axios from 'axios'
// import BASE_URL from './config.service.js'
import BASE_URL from './config.service'



// 创建axios对象
const request = axios.create({
	baseURL: BASE_URL,
	// 跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)，也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。
	// 注意：withCredentials和后端配置的cros跨域不可同时使用
	//withCredentials: true, 
	// 请求超时时间
	timeout: 10000,
	// 是否跨域请求
	crossDomain: true,
	// headers:{
	// 	"Content-Type":"application/json;charset:utf-8",
	// },
	headers: {
		"Content-Type": "multipart/form-data",
	},
})

// request拦截器,在请求之前做一些处理
request.interceptors.request.use(config => {
	//请求时显示正在加载中
	uni.showLoading({
		title: '加载中~'
	});
	//添加请求头，比如从本地缓存获取token
	if (uni.getStorageSync("GuangQiPhotoUploadToken")) {
		config.headers['token'] = uni.getStorageSync('GuangQiPhotoUploadToken')
	}
	return config;
}, error => {
	return Promise.reject(error);

});
// 配置成功后的拦截器
request.interceptors.response.use(response => {
	//请求时成功后关闭正在加载中
	uni.hideLoading();
	if (response.data.code == 0) {
		return response
	} else {
		uni.showToast({
			title: response.data.message || response.data.msg,
			duration: 2000,
			icon: 'none'
		})
		return Promise.reject(response.data.message || response.data.msg);
	}
}, error => {
	return Promise.reject(error)
})

export default request