import Base from './Base'
import request from '../common/requestJava'

class SysRole extends Base {
    save(data) {
        return this.request({
            url: this.baseUrl + '/save',
            method: 'post',
            data
        })
    }

    menuList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/menu/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    suggest(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/suggest',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    userList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/user/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
    userAdd(data) {
        return this.request({
            url: this.baseUrl + '/user/add',
            method: 'post',
            data
        })
    }

    menuAdd(data) {
        return this.request({
            url: this.baseUrl + '/menu/add',
            method: 'post',
            data
        })
    }
}

export default new SysRole('/sysRole', request)