import request from '@/utils/http'
import getEnvironmentUrl from '@/utils/environment'


export const fetchNoticeList = async () => {
	return await request({
		method: 'get',
		url: 'system/notice/list'
	})
}