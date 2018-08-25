<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加APP</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="info" :rules="rules" ref="ruleForm">
						<el-form-item label="AppID" prop="appID">
							<el-input v-model="info.appID"></el-input>
						</el-form-item>
						<el-form-item label="App名称" prop="appName">
							<el-input v-model="info.appName"></el-input>
						</el-form-item>
						<el-form-item label="App类型" prop="appType">
							<el-input v-model="info.appType"></el-input>
						</el-form-item>
						<el-form-item label="App客户" prop="appCustomer">
							<el-input v-model="info.appCustomer"></el-input>
						</el-form-item>
						<el-form-item label="极光Key" prop="JGKey">
							<el-input v-model="info.JGKey"></el-input>
						</el-form-item>
						<el-form-item label="短信账号" prop="smsAccount">
							<el-input v-model="info.smsAccount"></el-input>
						</el-form-item>
						<el-form-item label="短信标签" prop="smsLabel">
							<el-input v-model="info.smsLabel"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="add">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
export default {
	data() {
		return {
			info: {
				appID: '',
				appName: '',
				appType: '',
				appCustomer: '',
				JGKey: '',
				smsAccount: '',
				smsLabel: ''
			},
			rules: {
				appID: [
					{required: true, message: '请输入AppID'}
				],
				appName: [
					{required: true, message: '请输入App名称'},
					{min: 2, max: 20, message: '长度在 2 到 20 个字符'}
				],
				appType: [
					{required: true, message: '请输入App类型'}
				],
				appCustomer: [
					{required: true, message: '请输入App客户'}
				],
				JGKey: [
					{required: true, message: '请输入极光Key'}
				],
				smsAccount: [
					{required: true, message: '请输入短信账号'}
				],
				smsLabel: [
					{required: true, message: '请输入短信标签'}
				]
			}
		}
	},
	methods: {
		// 添加银行
		add() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				Message.success(res.data.message)
				this.$router.push({name: 'appmanage'})
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