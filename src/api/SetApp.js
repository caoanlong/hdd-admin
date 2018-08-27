import Base from './Base'
import request from '../common/requestJava'

class Member extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: 'info'
        })
    }
    save(data) {
        return this.request({
            url: this.baseUrl + '/save',
            method: 'post',
            data
        })
    }
    switchOperation(data) {
        return this.request({
            url: this.baseUrl + '/switchOperation',
            method: 'post',
            data
        })
    }
}

export default new Member('/setApp', request)