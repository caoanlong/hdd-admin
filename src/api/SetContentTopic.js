import Base from './Base'
import request from '../common/requestJava'

class SetContentTopic extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            add: '/save'
        })
    }
    suggest(params) {
        return new Promise((resolve, reject) => {
            this.request({
                url: this.baseUrl + '/suggest',
                params
            }).then(res => {
                resolve(res.data.data || res.data || res)
            })
        })
    }
}

export default new SetContentTopic('/setContentTopic', request)