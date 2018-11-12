import Base from './Base'
import request from '../common/requestJava'

class SysSmsTemplate extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            add: '/save',
            findById: '/info'
        })
    }
}

export default new SysSmsTemplate('/sysSmsTemplate', request)