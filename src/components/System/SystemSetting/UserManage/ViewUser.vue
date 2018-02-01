<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看用户</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<el-upload disabled class="avatar-uploader" action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" :on-success="handleAvatarSuccess">
								<img v-if="user.avatar" :src="user.avatar" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="归属公司">
							<p v-text="user.company"></p>
						</el-form-item>
						<el-form-item label="归属部门">
							<p v-text="user.department"></p>
						</el-form-item>
						<el-form-item label="工号">
							<p v-text="user.jobNo"></p>
						</el-form-item>
						<el-form-item label="姓名">
							<p v-text="user.name"></p>
						</el-form-item>
						<el-form-item label="登录名">
							<p v-text="user.username"></p>
						</el-form-item>
						<el-form-item label="邮箱">
							<p v-text="user.email"></p>
						</el-form-item>
						<el-form-item label="电话">
							<p v-text="user.tel"></p>
						</el-form-item>
						<el-form-item label="手机">
							<p v-text="user.mobile"></p>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<p>{{user.isDisabled?'是':'否'}}</p>
						</el-form-item>
						<el-form-item label="用户类型">
							<p v-text="user.type"></p>
						</el-form-item>
						<el-form-item label="用户角色">
							<p>{{user.role.join()}}</p>
						</el-form-item>					
						<el-form-item label="备注">
							<p v-text="user.desc"></p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				user: {
					name: '',
					username: '',
					tel: '',
					mobile: '',
					password: '',
					company: '',
					department: '',
					jobNo: '',
					type: '',
					desc: '',
					avatar: '',
					role: '',
					isDisabled: '',
					lastLoginTime: '',
					lastLoginIp: ''
				},
				roles: []
			}
		},
		created() {
			this.getUser()
			this.getRoles()
		},
		methods: {
			getUser() {
				let params = {
					id: this.$route.query.id
				}
				request({
					url: '/user/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.user = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.user.avatar = 'http://39.108.245.177:4000' + res.data
			},
			addUser() {
				let data = this.user
				data.id = this.user._id
				console.log(JSON.stringify(data))
				request({
					url: '/user/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						console.log(res.data)
						Message.success(res.data.msg)
						this.$router.push({name: 'usermanage'})
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			getRoles() {
				let params = {
					pageSize: 50
				}
				request({
					url: '/role',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.roles = res.data.data.roles
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus" scoped>
.avatar-uploader 
	.el-upload 
		border 1px dashed #d9d9d9
		border-radius 6px
		cursor pointer
		position relative
		overflow hidden
		vertical-align top
		&:hover 
			border-color #409eff
.avatar-uploader-icon 
	font-size 28px
	color #8c939d
	width 98px
	height 98px
	line-height 98px
	text-align center
.avatar 
	width 98px
	height 98px
	display block
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
	    font-family sans-serif
	    line-height 40px
	    color #999
	.el-input__inner
		vertical-align top
</style>