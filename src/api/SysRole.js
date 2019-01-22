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
}

export default new SysRole('/sysRole', request)