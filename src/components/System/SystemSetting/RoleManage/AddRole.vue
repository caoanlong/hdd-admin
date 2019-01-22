<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="role" :rules="rules" ref="ruleForm">
						<el-form-item label="名称" prop="name">
							<el-input auto-complete="off" v-model="role.name"></el-input>
						</el-form-item>
						<el-form-item label="英文名称" prop="enName">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="组织机构" prop="organizationID">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.organizationID">
								<el-option 
									v-for="item in organizations" 
									:key="item.organizationID" 
									:label="item.name" 
									:value="item.organizationID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="角色类型" prop="roleType">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.roleType">
								<el-option label="任务分配" value="assignment"></el-option>
								<el-option label="管理角色" value="security"></el-option>
								<el-option label="普通角色" value="user"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否系统数据">
							<el-radio-group v-model="role.issys">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否可用">
							<el-radio-group v-model="role.useable">
								<el-radio label="Y">是</el-radio>
								<el-radio label="N">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="role.remark"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addRole">立即创建</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/requestJava'
	import { Message } from 'element-ui'
    import SysRole from '../../../../api/SysRole'
    import SysOrganization from '../../../../api/SysOrganization'
	export default {
		data() {
			return {
				role: {
					name: '',
					enName: '',
					organizationID: '',
					roleType: '',
					issys: 'Y',
					useable: 'Y',
					remark: ''
				},
				organizations: [],
				rules: {
					name: [
						{required: true, message: '请输入名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					enName: [
						{required: true, message: '请输入英文名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Organization_ID: [
						{required: true, message: '请选择组织机构'}
					],
					roleType: [
						{required: true, message: '请选择角色类型'}
					],
				}
			}
		},
		created() {
			this.getOrganizations()
		},
		activated() {
			if(!this.$route.query.cache) {
				this.role = {
					name: '',
					enName: '',
					organizationID: '',
					roleType: '',
					issys: 'Y',
					useable: 'Y',
					remark: ''
				}
				this.getOrganizations()
			}
		},
		methods: {
			addRole() {
				this.$refs['ruleForm'].validate(valid => {
                    if (!valid) return
                    SysRole.save({
                        name:this.role.name,
                        enName:this.role.enName,
                        organizationID:this.role.organizationID,
                        roleType:this.role.roleType,
                        issys:this.role.issys,
                        useable:this.role.useable,
                        remark:this.role.remark
                    }).then(res => {
                        Message.success('保存成功！')
                        this.$router.push({name: 'rolemanage'})
                    })
                    
				})
			},
			// 获取所有机构
			getOrganizations() {
                SysOrganization.find({
                    pageSize: 1000
                }).then(res => {
                    this.organizations = res
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