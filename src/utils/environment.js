const getEnvironmentUrl = function(type) {

	let baseUrl = `${process.env.VUE_APP_API_BASE_URL}/prod-api/` //测试环境dev
	// let baseUrl = "http://127.0.0.1:4523/m1/3843091-0-default" //mock环境ip
	let phoneUrl = 'https://baidu' //线上地址
	if (type == 1) {
		return baseUrl
	} else if (type == 2) {
		return phoneUrl
	}
}

export default getEnvironmentUrl