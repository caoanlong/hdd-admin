export let INDEXDB = {
	indexedDB: window.indexedDB|| window.webkitindexedDB,
	IDBKeyRange: window.IDBKeyRange || window.webkitIDBKeyRange,//键范围
	openDB: function (myDB, dbname, dbversion) {
		//建立或打开数据库，建立对象存储空间(ObjectStore)
		let self = this
		let version = dbversion || 1
		let request = self.indexedDB.open(dbname,version)
		return new Promise((resolve, reject) => {
			request.onerror = function (e) {
				reject(e.currentTarget.error.message)
			}
			request.onsuccess = function (e){
				myDB.db = e.target.result
				resolve('成功建立并打开数据库:' + myDB.name +' version:' + dbversion)
			}
			request.onupgradeneeded = function (e) {
				let db = e.target.result,transaction = e.target.transaction,store
				if(!db.objectStoreNames.contains(myDB.ojstore.name)) {
					//没有该对象空间时创建该对象空间
					store = db.createObjectStore(myDB.ojstore.name, {keyPath: myDB.ojstore.keypath})
					resolve('成功建立对象存储空间：' + myDB.ojstore.name)
				}
			}
		})
	},
	deleteDB: function (dbname) {
		//删除数据库
		let self = this
		self.indexedDB.deleteDatabase(dbname)
		console.log(dbname + '数据库已删除')
	},
	closeDB: function (db) {
		//关闭数据库
		db.close()
		console.log('数据库已关闭')
	},
	addData: function (db, storename, data) {
		//添加数据，重复添加会报错
		let store = store = db.transaction(storename,'readwrite').objectStore(storename),request

		// for(let i = 0 ; i < data.length; i++){
		// 	request = store.add(data[i])
		// 	request.onerror = function () {
		// 		console.error('add添加数据库中已有该数据')
		// 	}
		// 	request.onsuccess = function () {
		// 		console.log('add添加数据已存入数据库')
		// 	}
		// }
		return new Promise((resolve, reject) => {
			request = store.add(data)
			request.onerror = function () {
				reject('add添加数据库中已有该数据')
			}
			request.onsuccess = function () {
				resolve('add添加数据已存入数据库')
			}
		})
	},
	putData: function (db, storename, data) {
		//添加数据，重复添加会更新原有数据
		let store = store = db.transaction(storename,'readwrite').objectStore(storename),request
		for(let i = 0 ; i < data.length; i++) {
			request = store.put(data[i])
			request.onerror = function () {
				console.error('put添加数据库中已有该数据')
			}
			request.onsuccess = function () {
				console.log('put添加数据已存入数据库')
			}
		}
	},
	getDataByKey: function (db, storename, key) {
		//根据存储空间的键找到对应数据
		let store = db.transaction(storename,'readwrite').objectStore(storename)
		let request = store.get(key)
		request.onerror = function () {
			console.error('getDataByKey error')
		}
		request.onsuccess = function (e) {
			let result = e.target.result
			console.log('查找数据成功')
			console.log(result)
		}
	},
	deleteData: function (db, storename, key) {
		//删除某一条记录
		let store = store = db.transaction(storename,'readwrite').objectStore(storename)
		store.delete(key)
		console.log('已删除存储空间'+storename+'中'+key+'记录')
	},
	clearData:function (db, storename) {
		//删除存储空间全部记录
		let store = db.transaction(storename,'readwrite').objectStore(storename)
		store.clear()
		console.log('已删除存储空间'+storename+'全部记录')
	}
}