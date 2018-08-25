import Base from './Base'
import request from '../common/requestJava'

class Member extends Base {
    constructor(url, req) {
        super(url, req)
    }
    updateStatus(data) {
        return this.request({
            url: this.baseUrl + '/updateStatus',
            method: 'post',
            data
        })
    }
}

export default new Member('/mem/memMember', request)