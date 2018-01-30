<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户信息</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="头像">
							<el-input auto-complete="off" v-model="role.name"></el-input>
						</el-form-item>
						<el-form-item label="归属公司">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.organization">
								<el-option label="总公司" value="总公司"></el-option>
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="研发部" value="研发部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="归属部门">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.type">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工号">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="登录名">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="密码">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="确认密码">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="邮箱">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="电话">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="手机">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="是否允许登录">
							<el-radio-group v-model="role.isDisabled">
								<el-radio :label="false">是</el-radio>
								<el-radio :label="true">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="用户类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.type">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用户角色">
							<el-checkbox-group>
								<el-checkbox label="管理员"></el-checkbox>
								<el-checkbox label="客服人员"></el-checkbox>
								<el-checkbox label="系统管理员"></el-checkbox>
								<el-checkbox label="运维管理员"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>					
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="role.desc" rows="5"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button>返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../../common/request'
	export default {
		data() {
			return {
				role: {
					name: '',
					enName: '',
					organization: '',
					type: '',
					isSystem: false,
					dataRange: '',
					isDisabled: false,
					desc: ''
				}
			}
		},
		methods: {
			addUser() {
				let data = this.role
				console.log(JSON.stringify(data))
				request({
					url: '/role/add',
					method: 'post',
					data
				}).then(res => {
					console.log(res.data)
				})
			}
		}
	}
</script>
<style lang="stylus">
	
</style>