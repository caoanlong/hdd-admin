<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<el-input auto-complete="off" v-model="role.Name"></el-input>
						</el-form-item>
						<el-form-item label="英文名称">
							<el-input auto-complete="off" v-model="role.EnName"></el-input>
						</el-form-item>
						<el-form-item label="组织机构">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.Organization_ID">
								<el-option label="总公司" value="总公司"></el-option>
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="研发部" value="研发部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="角色类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.RoleType">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="数据范围">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.DataScope">
								<el-option label="所有数据" value="所有数据"></el-option>
								<el-option label="所在公司及以下数据" value="所在公司及以下数据"></el-option>
								<el-option label="所在公司数据" value="所在公司数据"></el-option>
								<el-option label="所在部门及以下数据" value="所在部门及以下数据"></el-option>
								<el-option label="所在部门数据" value="所在部门数据"></el-option>
								<el-option label="仅本人数据" value="仅本人数据"></el-option>
								<el-option label="按明细设置" value="按明细设置"></el-option>
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
							<el-button type="primary" @click.native="editRole">提交修改</el-button>
							<el-button @click.native="back">返回</el-button>
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
				}
			}
		},
		created() {
			this.getRole()
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
				console.log(JSON.stringify(data))
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
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus">
	
</style>