import Base from './Base'
import request from '../common/requestJava'

class Company extends Base {
    _init(url) {
        this._find = `${url}/list`
        this._findById = `${url}/detail`
        this._add = `${url}/add`
        this._update = `${url}/update`
        this._del = `${url}/delete`
    }

    /**
     * 公司入驻申请
     */
    apply() {
        this._init('/apply')
        this.audit = data => {
            return this.request({
                url: this.baseUrl + '/apply/audit',
                method: 'post',
                data
            })
        }
        return this
    }
}

export default new Company('/company', request)