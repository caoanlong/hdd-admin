<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加栏目</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="栏目名称">
							<el-input auto-complete="off" v-model="role.name"></el-input>
						</el-form-item>
						<el-form-item label="代码">
							<el-input auto-complete="off" v-model="role.enName"></el-input>
						</el-form-item>
						<el-form-item label="类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="role.organization">
								<el-option label="总公司" value="总公司"></el-option>
								<el-option label="市场部" value="市场部"></el-option>
								<el-option label="行政部" value="行政部"></el-option>
								<el-option label="研发部" value="研发部"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="是否启用">
							<el-radio-group v-model="role.isSystem">
								<el-radio :label="true">是</el-radio>
								<el-radio :label="false">否</el-radio>
							</el-radio-group>
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