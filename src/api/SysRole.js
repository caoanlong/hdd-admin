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
}

export default new SysRole('/sysRole', request)