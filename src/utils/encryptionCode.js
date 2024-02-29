export const encryptionCode = (str, num = 16) => {
	const len = str?.length
	if (len < num || !str) return str
	const preStr = str?.substring(0, 5)
	const suffixStr = str?.substring(len - 6)
	return `${preStr}******${suffixStr}`
}