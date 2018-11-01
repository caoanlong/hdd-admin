'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    // BASE_API: '"http://192.168.1.16:3000/api"',      // nodejs本地环境
    BASE_API: '"http://192.168.1.48:3000/api"', // nodejs测试环境
    // BASE_JAVA_API: '"http://192.168.1.68:9898"', // 杨霞
    // BASE_JAVA_API: '"http://192.168.1.49:9090"',  // 新考
    // BASE_JAVA_API: '"http://192.168.1.43:9898"',  // 飞龙
    // BASE_JAVA_API: '"http://192.168.1.99:8888"',  // 军良
    BASE_JAVA_API: '"http://192.168.1.48:9898/huaxin"', // java测试环境
    BASE_SYS_API: '"http://192.168.1.29:8080"', // 系统服务
    BASE_IMG_API: '"http://develop.we-service.cn/hdd/image/"' // img测试环境
})