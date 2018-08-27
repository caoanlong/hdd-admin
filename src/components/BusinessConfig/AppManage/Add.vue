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
						<el-form-item label="App名称" prop="name">
							<el-input v-model="info.name"></el-input>
						</el-form-item>
						<el-form-item label="App客户" prop="appCstID">
							<el-autocomplete  style="width:100%"
								value-key="customerName" 
								v-model="info.customerName"
								:fetch-suggestions="getCustomer"
								placeholder="请输入..."
								@select="handSelectCustomer">
							</el-autocomplete>
						</el-form-item>
						<el-form-item label="极光Key" prop="jiGuangPushKey">
							<el-input v-model="info.jiGuangPushKey"></el-input>
						</el-form-item>
						<el-form-item label="极光密码" prop="jiGuangPushSecret">
							<el-input type="password" v-model="info.jiGuangPushSecret"></el-input>
						</el-form-item>
						<el-form-item label="短信账号" prop="smsAccount">
							<el-input v-model="info.smsAccount"></el-input>
						</el-form-item>
						<el-form-item label="短信标签" prop="smsFlag">
							<el-input v-model="info.smsFlag"></el-input>
						</el-form-item>
						<el-form-item label="短信密码" prop="smsPassword">
							<el-input type="password" v-model="info.smsPassword"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">立即保存</el-button>
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
import SetApp from '../../../api/SetApp'
import SetAppcustomer from '../../../api/SetAppcustomer'
import { checkInt } from '../../../common/validator'
export default {
	data() {
		return {
			info: {
				appID: '',
				appCstID: '',
				customerName: '',
				name: '',
				jiGuangPushKey: '',
				jiGuangPushSecret: '',
				smsAccount: '',
				smsFlag: ''
			},
			rules: {
				appID: [ {required: true, message: '请输入AppID'}, {validator: checkInt} ],
				appCstID: [ {required: true, message: '请选择App客户'} ],
				name: [ {required: true, message: '请输入App名称'}, {min: 2, max: 20, message: '长度在 2 到 20 个字符'} ],
				jiGuangPushKey: [ {required: true, message: '请输入极光Key'} ],
				jiGuangPushSecret: [ {required: true, message: '请输入极光密码'} ],
				smsAccount: [ {required: true, message: '请输入短信账号'} ],
				smsFlag: [ {required: true, message: '请输入短信标签'} ],
				smsPassword: [ {required: true, message: '请输入短信密码'} ],
			}
		}
	},
	methods: {
		getCustomer(queryString, cb) {
			this.info.appCstID = ''
			SetAppcustomer.find({
				pageSize: 1000,
				keyword: queryString
			}).then(res => {cb(res.list) })
		},
		handSelectCustomer(data) {
			this.info.appCstID = data.appCstID
			this.info.customerName = data.customerName
		},
		save() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SetApp.save(this.info).then(res => {
					Message.success(res.data.message)
					this.$router.push({name: 'appmanage'})
				})
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