//传入参数为location.search

export const url2json = (queryStr) => {
	const str = queryStr.substring(1)
	const keyArr = str.split('&')
	const keyMap = {}
	for (let i = 0; i < keyArr.length; i++) {
		const _arr = keyArr[i].split('=')
		keyMap[_arr[0]] = _arr[1]
	}
	return keyMap
}