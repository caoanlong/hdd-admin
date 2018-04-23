/**author:Caoanlong *day:2017-08-24
 * form表单数据请求
 * @param json 请求参数 {key:value,key:value,...}
 */
export function formDataReq(json) {
	var formData = new FormData()
	for (let attr in json) {
		formData.append(attr, json[attr])
	}
	return formData
}

export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result

	const later = function () {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function (...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

/**author:Caoanlong *day:2018-04-23
 * 导入文件校验
 * @param result 导入的json结果
 * @param map map
 * @param propertys 需要校验的字段
 */
export function validUploadFile(result, map, propertys) {
	return new Promise((resolve, reject) => {
		if (result.length == 0) {
			return reject('无数据！')
		}
		let uploadExcelConstants = []
		for (let i = 0; i < result.length; i++) {
			let excelConstant = {}
			let j = 1
			let item = result[i]
			for (let key in item) {
				if (!propertys.includes(key)) {
					return reject(`文件中应不包含“${key}”字段`)
				}
				for (let x = 0; x < propertys.length; x++) {
					if (!item[propertys[x]]) {
						return reject(`第${i + 1}行，第${j}列不能为空`)
					}
				}
				excelConstant[map[key]] = item[key]
				j++
			}
			uploadExcelConstants.push(excelConstant)
		}
		resolve(uploadExcelConstants)
	})
}
