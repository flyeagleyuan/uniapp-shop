let BASE_URL = ''

if (process.env.NODE_ENV == 'development') {
	BASE_URL = 'http://192.168.3.21:8080' // 开发环境
} else {
	BASE_URL = 'https://yun.kldhq.com' // 生产环境
	console.log = () => {}
}

export default BASE_URL
