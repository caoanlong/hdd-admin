<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="role" :rules="rules" ref="ruleForm">
						<el-form-item label="名称" prop="Name">
							<el-input auto-complete="off" v-model="role.Name"></el-input>
						</el-form-item>
						<el-form-item label="英文名称" prop="EnName">
							<el-input auto-complete="off" v-model="role.EnName"></el-input>
						</el-form-item>
						<el-form-item label="组织机构" prop="Organization_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.Organization_ID">
								<el-option 
									v-for="organization in organizations" 
									:key="organization.Organization_ID" 
									:label="organization.Name" 
									:value="organization.Organization_ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="角色类型" prop="RoleType">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.RoleType">
								<el-option label="任务分配" value="assignment"></el-option>
								<el-option label="管理角色" value="security-role"></el-option>
								<el-option label="普通角色" value="user"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="数据范围" prop="DataScope">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.DataScope">
								<el-option 
									v-for="sysDataScope in sysDataScopes" 
									:key="sysDataScope.Dict_ID" 
									:label="sysDataScope.NAME" 
									:value="sysDataScope.VALUE">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否系统数据">
							<el-radio-group v-model="role.Issys">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否可用">
							<el-radio-group v-model="role.Useable">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="role.Remark"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="editRole">提交修改</el-button>
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
				role: {
					Name: '',
					EnName: '',
					Organization_ID: '',
					RoleType: '',
					DataScope: '',
					Issys: 'Y',
					Useable: 'Y',
					Remark: ''
				},
				organizations: [],
				sysDataScopes: [],
				rules: {
					Name: [
						{required: true, message: '请输入名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					EnName: [
						{required: true, message: '请输入英文名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Organization_ID: [
						{required: true, message: '请选择组织机构'}
					],
					RoleType: [
						{required: true, message: '请选择角色类型'}
					],
					DataScope: [
						{required: true, message: '请选择数据范围'}
					]
				}
			}
		},
		created() {
			this.getRole()
			this.getOrganizations()
			this.getDataScope()
		},
		methods: {
			getRole() {
				let params = {
					Role_ID: this.$route.query.Role_ID
				}
				request({
					url: '/sys_role/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.role = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			editRole() {
				let data = {
					Role_ID: this.$route.query.Role_ID,
					Name: this.role.Name,
					EnName: this.role.EnName,
					Organization_ID: this.role.Organization_ID,
					RoleType: this.role.RoleType,
					DataScope: this.role.DataScope,
					Issys: this.role.Issys,
					Useable: this.role.Useable,
					Remark: this.role.Remark
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						request({
							url: '/sys_role/update',
							method: 'post',
							data
						}).then(res => {
							if (res.data.code == 0) {
								console.log(res.data)
								Message.success(res.data.msg)
								this.$router.push({name: 'rolemanage'})
							} else {
								Message.error(res.data.msg)
							}
						})
					}
				})
			},
			// 获取所有机构
			getOrganizations() {
				request({
					url: '/sys_organization/list/all',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
						this.organizations = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			// 获取数据范围
			getDataScope() {
				let params = {
					TYPE: 'sys_data_scope'
				}
				request({
					url: '/sys_dict/list/type',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.sysDataScopes = res.data.data
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
	
</style>