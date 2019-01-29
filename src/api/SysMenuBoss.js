import Base from './Base'
import request from '../common/requestJava'

class SysMenuBoss extends Base {
    tree(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/tree',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }

    save(data) {
        return this.request({
            url: this.baseUrl + '/save',
            method: 'post',
            data
        })
    }
}

export default new SysMenuBoss('/sysMenu', request)