<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加用户</span>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<ImageUpload :files="[user.Photo]" @imgUrlBack="handleAvatarSuccess" :fixed="true"/>
						</el-form-item>
						<el-form-item label="登录名">
							<el-input auto-complete="off" v-model="user.LoginName"></el-input>
						</el-form-item>
						<el-form-item label="支付密码">
							<el-input auto-complete="off" v-model="user.PayPassword"></el-input>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off" v-model="user.Mobile"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="归属公司">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Company_ID" @change="selectCompany">
								<el-option 
								v-for="company in companys" 
								:key="company.Organization_ID" 
								:label="company.Name" 
								:value="company.Organization_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Organization_ID">
								<el-option 
								v-for="department in departments" 
								:key="department.Organization_ID" 
								:label="department.Name" 
								:value="department.Organization_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="密码">
							<el-input auto-complete="off" v-model="user.Password"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-model="user.Email"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="user.LoginFlag">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="工号">
							<el-input auto-complete="off" v-model="user.JobNo"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="user.Name"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" v-model="user.Password2">
							<el-input auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off" v-model="user.Phone"></el-input>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.Type">
								<el-option label="系统管理" :value="0"></el-option>
								<el-option label="部门经理" :value="1"></el-option>
								<el-option label="普通用户" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="角色权限">
							<el-select style="width: 100%" v-model="user.sys_roles" multiple placeholder="请选择">
								<el-option v-for="role in roles" :key="role.EnName" :label="role.Name" :value="role.Role_ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="user.Remark" :rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="addUser">立即创建</el-button>
							<el-button @click.native="back">取消</el-button>
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
import ImageUpload from '../../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			user: {
				Company_ID: '',
				Organization_ID: '',
				LoginName: '',
				Password: '',
				Password2: '',
				PayPassword: '',
				JobNo: '',
				Name: '',
				Sex: '',
				Email: '',
				Phone: '',
				Mobile: '',
				Type: '',
				Photo: '',
				PCID: '',
				LoginFlag: 'N',
				Remark: '',
				sys_roles: []
			},
			roles: [],
			companys: [],
			departments: []
		}
	},
	created() {
		this.getRoles()
		this.getCompanys()
	},
	methods: {
		addUser() {
			let data = {
				Company_ID: this.user.Company_ID,
				Organization_ID: this.user.Organization_ID,
				LoginName: this.user.LoginName,
				Password: this.user.Password,
				Password2: this.user.Password2,
				PayPassword: this.user.PayPassword,
				JobNo: this.user.JobNo,
				Name: this.user.Name,
				Sex: this.user.Sex,
				Email: this.user.Email,
				Phone: this.user.Phone,
				Mobile: this.user.Mobile,
				Type: 0,
				Photo: this.user.Photo,
				PCID: this.user.PCID,
				LoginFlag: this.user.LoginFlag,
				Remark: this.user.Remark,
				sys_roles: this.user.sys_roles
			}
			console.log(data)
			request({
				url: '/sys_user/add',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					console.log(res.data)
					Message.success(res.data.msg)
					this.$router.push({ name: 'usermanage' })
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getRoles() {
			let params = {
				pageSize: 100
			}
			request({
				url: '/sys_role/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					let Oroles = res.data.data.rows
					this.roles = Oroles.map(item => {
						return {
							Role_ID: item.Role_ID,
							Name: item.Name
						}
					})
					console.log(this.roles)
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getCompanys(Organization_PID) {
			let params = {
				Organization_PID
			}
			request({
				url: '/sys_organization/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					if (Organization_PID) {
						this.departments = res.data.data
					} else {
						this.companys = res.data.data
					}
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		selectCompany(Organization_ID) {
			this.getCompanys(Organization_ID)
		},
		handleAvatarSuccess(res) {
			this.user.Photo = res[0]
		},
		back() {
			this.$router.push({ name: 'usermanage' })
		}
	},
	components: {
		ImageUpload
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
</style>