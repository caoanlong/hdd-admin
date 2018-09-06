import Base from './Base'
import request from '../common/requestJava'

class Sys extends Base {
    constructor(url, req) {
        super(url, req)
    }
    apps() {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/apps'
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new Sys('/sys', request)