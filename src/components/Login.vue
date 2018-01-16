<template>
	<div class="login-container">
		<el-form class="login-form" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
			<div class="title-container">
				<h3 class="title">登录</h3>
			</div>
			<el-form-item prop="username">
				<span class="svg-container svg-container_login">
					<svg-icon icon-class="user"/>
				</span>
				<el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password"/>
				</span>
				<el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
				<span class="show-pwd" @click="showPwd">
					<svg-icon icon-class="eye"/>
				</span>
			</el-form-item>
			<el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
			<div class="tips">
				<span>用户名 : admin</span>
				<span>密码 : 123456</span>
			</div>
			<div class="tips">
				<span style="margin-right:18px;">用户名 : editor</span>
				<span>密码 : 123456</span>
			</div>
		</el-form>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				loginForm: {
					username: 'admin',
					password: '1111111'
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
						this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
						this.loading = false
						this.$router.push({ path: '/' })
						}).catch(() => {
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
<style lang="stylus">
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
					-webkit-box-shadow 0 0 0px 1000px #2d3a4b inset !important
					-webkit-text-fill-color #fff !important
		.el-form-item
			border 1px solid rgba(255, 255, 255, 0.1)
			background rgba(0, 0, 0, 0.1)
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
			.tips
				font-size 14px
				color #fff
				margin-bottom 10px
				span
					margin-right 16px
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