/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
	const valid_map = ['admin', 'editor']
	return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
	const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
	return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
	const reg = /^[a-z]+$/
	return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
	const reg = /^[A-Z]+$/
	return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
	const reg = /^[A-Za-z]+$/
	return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}

// 验证手机号
export const checkMobile = (rule, value, callback) => {
	if (!value) {
		callback(new Error('手机号不能为空'))
	}
	let regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!regMobile.test(value)) {  
		callback(new Error('请输入正确的手机号'))
	} else {  
		callback()
	} 
}

// 验证电话(包括手机号)(可以为空)
export const checkTel = (rule, value, callback) => {
	if (!value) {
		callback()
		return
	}
	let regTel = /^([0-9]{3,4}-)?[0-9]{7,8}$/
	let regMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!regMobile.test(value) && !regTel.test(value)) {
		callback(new Error('请输入正确的电话'))
		return
	}
	callback()
}

// 验证传真(可以为空)
export const checkFax = (rule, value, callback) => {
	if (!value) {
		callback()
		return
	}
	let regTel = /^([0-9]{3,4}-)?[0-9]{7,8}$/
	if (!regTel.test(value)) {
		callback(new Error('请输入正确的传真'))
		return
	}
	callback()
}

// 验证邮箱
export const checkEmail = (rule, value, callback) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (!re.test(value)) {
		callback(new Error('请输入正确的邮箱'))
	} else {
		callback()
	}
}


// 验证非负浮点数（正浮点数 + 0） 2位小数
export const checkFloat2 = (rule, value, callback) => {
	let r = /^[0-9]+(.[0-9]{1,2})?$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}
// 验证非负浮点数（正浮点数 + 0） 6位小数
export const checkFloat6 = (rule, value, callback) => {
	let r = /^[0-9]+(.[0-9]{1,6})?$/
	if (r.test(value) || value == 0) {
		callback()
	} else {
		callback(new Error('请输入正确的数字'))
	}
}

