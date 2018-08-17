<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加App客户</span>
			</div>
			<el-form label-width="120px" :model="appCustomer" ref="ruleForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="头像" prop="Photo">
							
						</el-form-item>
						<el-form-item label="登录名" prop="LoginName">
							<el-input auto-complete="off" v-model="appCustomer.LoginName"></el-input>
						</el-form-item>
						<el-form-item label="支付密码" prop="PayPassword">
							<el-input auto-complete="off" v-model="appCustomer.PayPassword"></el-input>
						</el-form-item>
						<el-form-item label="手机" prop="Mobile">
							<el-input auto-complete="off" v-model="appCustomer.Mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="归属公司" prop="Company_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="appCustomer.Company_ID" @change="selectCompany">
								<el-option 
								v-for="company in companys" 
								:key="company.Organization_ID" 
								:label="company.Name" 
								:value="company.Organization_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门" prop="Organization_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="appCustomer.Organization_ID">
								<el-option 
								v-for="department in departments" 
								:key="department.Organization_ID" 
								:label="department.Name" 
								:value="department.Organization_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="密码" prop="Password">
							<el-input auto-complete="off" v-model="appCustomer.Password"></el-input>
						</el-form-item>
						<el-form-item label="邮箱" prop="Email">
							<el-input auto-complete="off" v-model="appCustomer.Email"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="appCustomer.LoginFlag">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="工号" prop="JobNo">
							<el-input auto-complete="off" v-model="appCustomer.JobNo"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="Name">
							<el-input auto-complete="off" v-model="appCustomer.Name"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="Password2">
							<el-input auto-complete="off" v-model="appCustomer.Password2"></el-input>
						</el-form-item>
						<el-form-item label="电话" prop="Phone">
							<el-input auto-complete="off" v-model="appCustomer.Phone"></el-input>
						</el-form-item>
						<el-form-item label="用户类型" prop="Type">
							<el-select style="width: 100%" placeholder="请选择" v-model="appCustomer.Type">
								<el-option label="系统管理" :value="0"></el-option>
								<el-option label="部门经理" :value="1"></el-option>
								<el-option label="普通用户" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="角色权限" prop="sys_roles">
							<el-select style="width: 100%" v-model="appCustomer.sys_roles" multiple placeholder="请选择">
								<el-option v-for="role in roles" :key="role.EnName" :label="role.Name" :value="role.Role_ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="appCustomer.Remark" :rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">立即创建</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import { checkMobile, checkTel } from '../../../common/validator'
export default {
	data() {
		appCustomer:{}
	},
	methods: {
		save() {
			let data = this.appCustomer
			this.$refs['ruleForm'].validate(valid => {
				// if (valid) {
				// 	requestJava({
				// 		url: '/sys_user/add',
				// 		method: 'post',
				// 		data
				// 	}).then(res => {
				// 		if (res.data.code == 0) {
				// 			console.log(res.data)
				// 			Message.success(res.data.msg)
				// 			this.$router.push({ name: 'usermanage' })
				// 		} else {
				// 			Message.error(res.data.msg)
				// 		}
				// 	})
				// }
			})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>