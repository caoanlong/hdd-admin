import { INDEXDB } from './common/DataBase'

(function () {
	const routeMenu = [{
		"id": "home",
		"path": "/",
		"name": "home",
		"component": "/Home",
		"meta": {
			"title": "首页",
			"icon": "home",
			"roles": "admin,editor",
			"isMenu": true
		},
		"redirect": null,
		"children": null
	}]
	let myDB = {
		name: 'hddAdmin',
		version: 1,
		db: null,
		ojstore: {
			name: 'routersMenu',//存储空间表的名字
			keypath: 'id'//主键
		}
	}
	INDEXDB.openDB(myDB, myDB.name, myDB.version).then(res => {
		console.log(res)
		INDEXDB.addData(myDB.db, myDB.ojstore.name, routeMenu).then(response => {
			console.log(response)
			INDEXDB.closeDB(myDB.db)
		}).catch(err => {
			console.error(err)
		})
	}).catch(err => {
		console.error(err)
	})
})()