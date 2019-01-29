import Base from './Base'
import request from '../common/requestJava'

class SysLog extends Base {
    apiList(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/api/list',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new SysLog('/sys/log', request)