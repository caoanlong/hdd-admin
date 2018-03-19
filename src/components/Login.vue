<template>
	<div class="login-container">
		<el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
			<div class="title-container">
				<h3 class="title">货多多后台管理系统</h3>
			</div>
			<el-form-item prop="LoginName">
				<span class="svg-container svg-container_login">
					<svg-icon icon-class="user"/>
				</span>
				<el-input name="LoginName" type="text" v-model="loginForm.LoginName" autoComplete="on" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item prop="Password">
				<span class="svg-container">
					<svg-icon icon-class="password"/>
				</span>
				<el-input name="Password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.Password" autoComplete="on" placeholder="请输入密码"/>
				<span class="show-pwd" @click="showPwd">
					<svg-icon icon-class="eye"/>
				</span>
			</el-form-item>
			<el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
		</el-form>
	</div>
</template>
<script type="text/javascript">
	import { Message } from 'element-ui'
	import {isvalidUsername} from '../common/validator'
	export default {
		data () {
			// const validateUsername = (rule, value, callback) => {
			// 	if (!isvalidUsername(value)) {
			// 		callback(new Error('请输入正确的用户名！'))
			// 	} else {
			// 		callback()
			// 	}
			// }
			const validatePassword = (rule, value, callback) => {
				if (value.length < 5) {
					callback(new Error('密码不能少于5位！'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					LoginName: '',
					Password: ''
				},
				loginRules: {
					LoginName: [{ required: true, trigger: 'blur' }],
					Password: [{ required: true, trigger: 'blur', validator: validatePassword }]
				},
				passwordType: 'password',
				loading: false
			}
		},
		methods: {
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
			},
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.$store.dispatch('Login', this.loginForm).then((res) => {
							this.$store.dispatch('GetUserInfo')
							this.$store.dispatch('getMenu')
							this.loading = false
							Message.success('登录成功')
							this.$router.push({ path: '/' })
						}).catch((err) => {
							Message.error(err)
							this.loading = false
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.login-container
		.el-input
			display inline-block
			height 47px
			width 85%
			input
				background transparent
				border 0px
				-webkit-appearance none
				border-radius 0px
				padding 12px 5px 12px 15px
				color #eee
				height 47px
				&:-webkit-autofill
					-webkit-box-shadow 0 0 0px 1000px #283443 inset !important
					-webkit-text-fill-color #fff !important
		.el-form-item
			border 1px solid rgba(255, 255, 255, 0.1)
			background #283443
			border-radius 5px
			color #454545
</style>
<style lang="stylus" scoped>
	.login-container
		height 100vh
		background-color #2d3a4b
		.login-form
			position absolute
			left 0
			right 0
			width 520px
			padding 35px 35px 15px 35px
			margin 120px auto
			.svg-container
				padding 6px 5px 6px 15px
				color #889aa4
				vertical-align middle
				width 30px
				display inline-block
				.svg-container_login
					font-size 20px
			.title-container
				position relative
				.title
					font-size 26px
					font-weight 400
					color #eee
					margin 0px auto 40px auto
					text-align center
					font-weight bold
			.show-pwd
				position absolute
				right 10px
				top 7px
				font-size 16px
				color #889aa4
				cursor pointer
				user-select none
</style>