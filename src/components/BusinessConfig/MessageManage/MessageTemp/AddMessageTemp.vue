<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加消息模板</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="messagetemplate" :rules="rules" ref="ruleForm">
						<el-form-item label="APP页面" prop="AppPage_ID">
							<el-select style="width: 100%" placeholder="请选择" v-model="messagetemplate.AppPage_ID">
								<el-option v-for="appPage in appPages" :key="appPage.AppPage_ID" :label="appPage.Name" :value="appPage.AppPage_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="跳转URL" prop="ForwardURL">
							<el-input v-model="messagetemplate.ForwardURL"></el-input>
						</el-form-item>
						<el-form-item label="JSON跳转样例">
							<el-input v-model="messagetemplate.JSONForward"></el-input>
						</el-form-item>
						<el-form-item label="代码" prop="Code">
							<el-input v-model="messagetemplate.Code"></el-input>
						</el-form-item>
						<el-form-item label="名称" prop="Name">
							<el-input v-model="messagetemplate.Name"></el-input>
						</el-form-item>
						<el-form-item label="标题" prop="Title">
							<el-input v-model="messagetemplate.Title"></el-input>
						</el-form-item>
						<el-form-item label="类型" prop="type">
							<el-select style="width: 100%" placeholder="请选择" v-model="messagetemplate.type">
								<el-option label="通知" value="SystemMsg"></el-option>
								<el-option label="订阅" value="SubscribeMsg"></el-option>
								<el-option label="货源" value="GoodsMsg"></el-option>
								<el-option label="钱包" value="WalletMsg"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="图标">
							<el-input v-model="messagetemplate.IconURL"></el-input>
						</el-form-item>
						<el-form-item label="格式" prop="Content">
							<el-input v-model="messagetemplate.Content"></el-input>
						</el-form-item>
						<el-form-item label="JSON样例" prop="JSONSample">
							<el-input v-model="messagetemplate.JSONSample"></el-input>
						</el-form-item>
						<el-form-item label="是否有效">
							<el-switch v-model="messagetemplate.IsEnable"></el-switch>
						</el-form-item>
						<el-form-item label="极光类型">
							<el-input v-model="messagetemplate.PushType"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addMessagetemplate">立即保存</el-button>
							<el-button @click="back">取消</el-button>
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
	import { checkURL } from '../../../../common/validator'
	export default {
		data() {
			return {
				messagetemplate: {
					IsEnable: false
				},
				appPages: [],
				rules: {
					AppPage_ID: [
						{required: true, message: '请选择APP页面'}
					],
					ForwardURL: [
						{required: true, message: '请输入跳转URL'}
					],
					Code: [
						{required: true, message: '请输入代码'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Name: [
						{required: true, message: '请输入名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Title: [
						{required: true, message: '请输入标题'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					type: [
						{required: true, message: '请选择类型'},
					],
					Content: [
						{required: true, message: '请输入格式'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					JSONSample: [
						{required: true, message: '请输入JSON样例'}
					]
				}
			}
		},
		created() {
			this.getApppages()
		},
		methods: {
			addMessagetemplate() {
				let data= {
					AppPage_ID: this.messagetemplate.AppPage_ID,
					ForwardURL: this.messagetemplate.ForwardURL,
					JSONForward: this.messagetemplate.JSONForward,
					Name: this.messagetemplate.Name,
					Code: this.messagetemplate.Code,
					Title: this.messagetemplate.Title,
					type: this.messagetemplate.type,
					IconURL: this.messagetemplate.IconURL,
					Content: this.messagetemplate.Content,
					JSONSample: this.messagetemplate.JSONSample,
					IsEnable: this.messagetemplate.IsEnable ? 'Y' : 'N',
					PushType: this.messagetemplate.PushType
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						request({
							url: '/set_messagetemplate/add',
							method: 'post',
							data
						}).then(res => {
							if (res.data.code == 0) {
								Message.success(res.data.msg)
								this.$router.push({name: 'messagetemp'})
							} else {
								Message.error(res.data.msg)
							}
						})
					}
				})
			},
			getApppages() {
				request({
					url: '/set_apppage/listall',
					method: 'get'
				}).then(res => {
					if (res.data.code == 0) {
						this.appPages = res.data.data
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