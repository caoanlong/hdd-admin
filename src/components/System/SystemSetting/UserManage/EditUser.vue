<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑用户</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<el-upload
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg" 
								:show-file-list="false" 
								:on-success="handleAvatarSuccess">
								<img v-if="user.Photo" :src="user.Photo" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="归属公司">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Company_ID">
								<el-option label="总公司" value="总公司"></el-option>
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="研发部" value="研发部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Organization_ID">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工号">
							<el-input auto-complete="off" v-model="user.JobNo"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="user.Name"></el-input>
						</el-form-item>
						<el-form-item label="登录名">
							<el-input auto-complete="off" v-model="user.LoginName"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-model="user.Email"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off" v-model="user.Phone"></el-input>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off" v-model="user.Mobile"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="user.LoginFlag">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Type">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-select style="width: 100%" v-model="selectedRoles" multiple placeholder="请选择">
								<el-option v-for="role in roles" :key="role.EnName" :label="role.Name" :value="role.Role_ID">
								</el-option>
							</el-select>
						</el-form-item>				
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="user.Remark" :rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="editUser">立即保存</el-button>
							<el-button @click="back">取消</el-button>
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
					Company_ID:'',
					Organization_ID:'',
					LoginName:'',
					JobNo:'',
					Name:'',
					Sex:'',
					Email:'',
					Phone:'',
					Mobile:'',
					Type:'',
					Photo:'',
					PCID:'',
					LoginFlag:'',
					Remark:''
				},
				roles: [],
				selectedRoles: [],
				isAllowLogin: true
			}
		},
		created() {
			this.getUser()
			this.getRoles()
		},
		methods: {
			getUser() {
				let params = {
					User_ID: this.$route.query.User_ID
				}
				request({
					url: '/sys_user/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.user = res.data.data
						this.isAllowLogin = res.data.data.LoginFlag == 'Y' ? true : false
						this.selectedRoles = res.data.data.sys_roles.map(item => item.Role_ID)
						console.log(this.user)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			handleAvatarSuccess(res, file) {
				this.user.Photo = 'http://39.108.245.177:4000' + res.data
			},
			editUser() {
				let data= {
					User_ID:this.user.User_ID,
					Company_ID:this.user.Company_ID,
					Organization_ID:this.user.Organization_ID,
					LoginName:this.user.LoginName,
					JobNo:this.user.JobNo,
					Name:this.user.Name,
					Sex:this.user.Sex,
					Email:this.user.Email,
					Phone:this.user.Phone,
					Mobile:this.user.Mobile,
					Type:0,
					Photo:this.user.Photo,
					PCID:this.user.PCID,
					LoginFlag:this.user.LoginFlag,
					Remark:this.user.Remark
				}
				console.log(data)
				request({
					url: '/sys_user/update',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
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
					url: '/sys_role/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.roles = res.data.data.rows
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
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
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
		vertical-align top
.el-checkbox
	margin-left 0!important
	margin-right 30px
</style>