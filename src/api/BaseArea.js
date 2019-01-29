import Base from './Base'
import request from '../common/requestJava'

class BaseArea extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/getDetail',
            update: '/update',
        })
    }
    getSubList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/getSubList',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new BaseArea('/baseArea', request)