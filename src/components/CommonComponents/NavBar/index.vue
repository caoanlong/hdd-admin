<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<breadcrumb class="breadcrumb-container"></breadcrumb>
		<div class="right-menu">
			<el-tooltip effect="dark" content="navbar.theme" placement="bottom"></el-tooltip>
			<el-dropdown class="avatar-container right-menu-item">
				<div class="avatar-wrapper">
					<img class="user-avatar" :src="imgUrl + photo" @error="errorImg">
					<span class="user-text">你好！{{name}}</span>
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<router-link :to="{name:'userprofile'}">
						<el-dropdown-item>个人资料</el-dropdown-item>
					</router-link>
					<router-link to="/">
						<el-dropdown-item>通讯录</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided>
						<span @click="logout" style="display:block;">退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '../Breadcrumb'
import Hamburger from '../Hamburger'

export default {
	computed: {
		...mapGetters([
			'sidebar',
			'name',
			'photo'
		])
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('toggleSideBar')
		},
		logout() {
			this.$store.dispatch('LogOut').then(() => {
				location.reload()
			})
		},
		errorImg (e) {
			e.target.src = require('../../../assets/imgs/avatar.gif')
			e.target.onerror = null
		}
	},
	components: {
		Breadcrumb,
		Hamburger
	}
}
</script>

<style lang="stylus" scoped>
.navbar
	width 100%
	height 50px
	line-height 50px
	border-radius 0px !important
	.hamburger-container
		float left
		width 50px
		line-height 58px
		height 50px
		padding 0 10px
	.breadcrumb-container
		display inline-block
	.right-menu
		float right
		width 200px
		height 100%
		&:focus
		 outline none
		.right-menu-item
			display inline-block
			margin 0 8px
		.screenfull
			height 20px
		.international
			vertical-align top
		.theme-switch
			vertical-align 15px
		.avatar-container
			height 50px
			margin-right 30px
			.avatar-wrapper
				height 50px
				cursor pointer
				padding-top 5px
				position relative
				.user-avatar
					width 40px
					height 40px
					border-radius 20px
				.user-text
					position relative
					top -15px
					padding-left 5px
				.el-icon-caret-bottom
					position absolute
					right -20px
					top 50%
					font-size 12px
					transform translateY(-50%)
</style>
