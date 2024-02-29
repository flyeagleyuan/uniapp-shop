import request from '@/utils/http'
import getEnvironmentUrl from '@/utils/environment'


export const fetchClientDownloadList = async (params) => {
	return await request({
		method: 'get',
		url: '/wechatplug/download/downloadlist',
		data: params
	})
}


export const fetchWXPayOrder = async (params) => {
	return await request({
		method: 'get',
		url: `/wechatplug/order/createWxOrder/${params.productId}`,
		data: params
	})
}