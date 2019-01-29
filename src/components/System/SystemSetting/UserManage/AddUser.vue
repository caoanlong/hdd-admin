<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加用户</span>
			</div>
			<el-form label-width="120px" :model="user" :rules="rules" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像" prop="photo">
							<ImageUpload :files="[user.photo]" @imgUrlBack="handleAvatarSuccess" :fixed="true"/>
						</el-form-item>
						<el-form-item label="登录名" prop="loginName">
							<el-input v-model="user.loginName"></el-input>
						</el-form-item>
						<el-form-item label="支付密码" prop="payPassword">
							<el-input v-model="user.payPassword"></el-input>
						</el-form-item>
						<el-form-item label="手机" prop="mobile">
							<el-input v-model="user.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="密码" prop="password">
							<el-input v-model="user.password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="password2">
							<el-input v-model="user.password2"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="user.email"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="user.loginFlag">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工号" prop="jobNo">
							<el-input v-model="user.jobNo"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="name">
							<el-input v-model="user.name"></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="phone">
							<el-input v-model="user.phone"></el-input>
						</el-form-item>
						<el-form-item label="用户类型" prop="type">
							<el-select style="width: 100%" placeholder="请选择" v-model="user.type">
								<el-option label="系统管理" :value="0"></el-option>
								<el-option label="部门经理" :value="1"></el-option>
								<el-option label="普通用户" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="角色权限">
							<el-select 
								style="width: 100%" 
								v-model="selectedRoles" 
								multiple 
								placeholder="请选择">
								<el-option 
									v-for="role in roles" 
									:key="role.roleID" 
									:label="role.name" 
									:value="role.roleID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="user.remark" :rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">立即创建</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../../../CommonComponents/ImageUpload'
import { checkMobile, checkTel } from '../../../../common/validator'
import SysUser from '../../../../api/SysUser'
import SysRole from '../../../../api/SysRole'
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback('请输入密码')
			} else {
				if (this.user.password2 !== '') {
					this.$refs.ruleForm.validateField('password2')
				}
				callback()
			}
		}
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback('请再次输入密码')
			} else if (value !== this.user.password) {
				callback('两次输入密码不一致!')
			} else {
				callback()
			}
		}
		return {
			user: {
				password: '',
				password2: '',
				email: "",
				jobNo: "",
				loginName: "",
				mobile: "",
				name: "",
				payPassword: "",
				pcID: "",
				phone: "",
				photo: "",
				remark: "",
				loginFlag: "Y"
			},
			selectedRoles: [],
			roles: [],
			rules: {
				password: [
					{required: true, validator: validatePass},
					{ min: 6, max: 8, message: '长度在 6 到 8 个字符'}
				],
				password2: [{required: true, validator: validatePass2}],
				photo: [ {required: true, message: '请上传头像'} ],
				loginName: [
					{required: true, message: '请输入登录名'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				payPassword: [
					{required: true, message: '请输入支付密码'},
					{ min: 6, max: 8, message: '长度在 6 到 8 个字符'}
				],
				mobile: [ {required: true, validator: checkMobile} ],
				email: [ {type: 'email', message: '请输入正确的邮箱地址'} ],
				jobNo: [
					{required: true, message: '请输入工号'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				name: [
					{required: true, message: '请输入姓名'},
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				phone: [ {validator: checkTel} ],
				type: [ {required: true, message: '请选择类型'} ]
			}
		}
	},
	created() {
		this.getRoles()
	},
	methods: {
		getRoles() {
			SysRole.suggest().then(res => {
				this.roles = res
			})
		},
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysUser.add({
					email: this.user.email,
					jobNo: this.user.jobNo,
					loginName: this.user.loginName,
					mobile: this.user.mobile,
					name: this.user.name,
					password: this.user.password,
					password2: this.user.password2,
					payPassword: this.user.payPassword,
					phone: this.user.phone,
					photo: this.user.photo,
					remark: this.user.remark,
					loginFlag: this.user.loginFlag,
					roleIDs: this.selectedRoles.join(',')
				}).then(res => {
					Message.success(res.data.msg)
					this.$router.push({name: 'usermanage'})
				})
			})
		},
		handleAvatarSuccess(res) {
			this.user.photo = res[0]
		},
		back() {
			this.$router.go(-1)
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