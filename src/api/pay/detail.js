import request from '@/utils/http'
import getEnvironmentUrl from '@/utils/environment'

export const getPayDetail = async (params) => {
	return await request({
		method: 'get',
		data: params || {},
		url: `/wechatplug/order/getInfoH5/${params.orderId}`
	})
}