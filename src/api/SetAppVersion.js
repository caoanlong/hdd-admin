import Base from './Base'
import request from '../common/requestJava'

class SetAppVersion extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            del: '/del'
        })
    }
    save(data) {
        return this.request({
            url: this.baseUrl + '/save',
            method: 'post',
            data
        })
    }
    release(data) {
        return this.request({
            url: this.baseUrl + '/release',
            method: 'post',
            data
        })
    }
}

export default new SetAppVersion('/setAppVersion', request)