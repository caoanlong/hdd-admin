<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加角色</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="名称">
							<el-input auto-complete="off" v-model="role.name"></el-input>
						</el-form-item>
						<el-form-item label="英文名称">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="组织机构">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.organization">
								<el-option label="总公司" value="总公司"></el-option>
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="研发部" value="研发部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="角色类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.type">
								<el-option label="任务分配" value="任务分配"></el-option>
								<el-option label="管理角色" value="管理角色"></el-option>
								<el-option label="普通角色" value="普通角色"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="数据范围">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.dataRange">
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
							<el-radio-group v-model="role.isSystem">
								<el-radio :label="true">是</el-radio>
								<el-radio :label="false">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="是否可用">
							<el-radio-group v-model="role.isDisabled">
								<el-radio :label="false">是</el-radio>
								<el-radio :label="true">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" resize="none" v-model="role.desc"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="addRole">立即创建</el-button>
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
			addRole() {
				let data = this.role
				console.log(JSON.stringify(data))
				request({
					url: '/role/add',
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