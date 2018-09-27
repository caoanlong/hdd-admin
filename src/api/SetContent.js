import Base from './Base'
import request from '../common/requestJava'

class SetContent extends Base {
    constructor(url, req) {
        super(url, req).initURI({
            findById: '/info',
            add: '/save'
        })
    }
}

export default new SetContent('/setContent', request)