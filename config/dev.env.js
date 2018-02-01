'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	BASE_API: '"http://192.168.1.16:3000/hddadmin"'
	// BASE_API: '"http://192.168.1.48:3000/hddadmin"'
})
