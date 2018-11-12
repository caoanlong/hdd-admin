<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑短信模板</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="smsTemp" :rules="rules" ref="ruleForm">
						<el-form-item label="任务类型" prop="businessType">
							<el-input v-model="smsTemp.businessType"></el-input>
						</el-form-item>
						<el-form-item label="短信服务商模版代码" prop="smsProviderTemplateCode">
							<el-input v-model="smsTemp.smsProviderTemplateCode"></el-input>
						</el-form-item>
						<el-form-item label="模板代码" prop="code">
							<el-input v-model="smsTemp.code"></el-input>
						</el-form-item>
						<el-form-item label="模板内容" prop="content">
							<el-input type="textarea" v-model="smsTemp.content"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="editSmsTemp">立即保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import SysSmsTemplate from '../../../api/SysSmsTemplate'
export default {
	data() {
		return {
			smsTemp: {
				businessType: '',
				smsProviderTemplateCode: '',
				code: '',
				content: ''
			},
			rules: {
				businessType: [{required: true, message: '请输入任务类型'}],
				smsProviderTemplateCode: [{required: true, message: '请输入短信服务商模版代码'}],
				code: [{required: true, message: '请输入模板代码'}],
				content: [
					{required: true, message: '请输入模板内容'},
					{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
				]
			}
		}
	},
	created() {
		this.getSmsTemp()
	},
	methods: {
		editSmsTemp() {
			this.$refs['ruleForm'].validate(valid => {
				if (!valid) return
				SysSmsTemplate.add({
					smsTemplateId: this.$route.query.smsTemplateId,
					businessType: this.smsTemp.businessType,
					smsProviderTemplateCode: this.smsTemp.smsProviderTemplateCode,
					code: this.smsTemp.code,
					content: this.smsTemp.content
				}).then(res => {
					Message.success(res.data.message)
					this.$router.push({name: 'smstemp'})
				})
			})
		},
		getSmsTemp() {
			const smsTemplateId = this.$route.query.smsTemplateId
			SysSmsTemplate.findById({ smsTemplateId }).then(res => {
				this.smsTemp = res
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
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999
	.el-input__inner
		vertical-align top
</style>