export let DataBase = {
	name: 'test',
	version: 1,
	db: null,
	openDB: function () {
		let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
		let request
		let version = this.version || 1
		request = indexedDB.open(this.name, version)
		// console.log(this)
		// let trans, objectStore
		request.onupgradeneeded = e => {
			console.log('DB version changed to ' + version)
		}
		request.onerror = e => {
			console.error(e.currentTarget.error.message)
		}
		request.onsuccess = e => {
			console.log('DataBase connect success!')
			this.db = e.target.result
			console.log(this.db)
			if(!this.db.objectStoreNames.contains('students')){
				this.db.createObjectStore('students', {keyPath: "id"})
			}
		}
	},
	closeDB: function () {
		this.db.close()
	},
	deleteDB: function () {
		indexedDB.deleteDatabase(this.name)
	}
}