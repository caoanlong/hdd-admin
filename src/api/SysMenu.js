import Base from './Base'
import request from '../common/requestJava'

class SysMenu extends Base {
    update(data) {
        return this.request({
            url: this.baseUrl + '/update',
            method: 'post',
            data
        })
    }
}

export default new SysMenu('/sys/menu', request)