import { javaImgUrl } from './requestJava'

export default function install(Vue) {
    Vue.prototype.imgUrl = javaImgUrl
}