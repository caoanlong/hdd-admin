import Base from './Base'
import request from '../common/requestJava'

class SysUser extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            update: '/update'
        })
    }
    updatePassword(data) {
        return this.request({
            url: this.baseUrl + '/updatePassword',
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

    userInfo(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/user/info',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    userUpdate(data) {
        return this.request({
            url: this.baseUrl + '/user/update',
            method: 'post',
            data
        })
    }
}

export default new SysUser('/sys/user', request)