<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑短信模板</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="任务类型">
							<el-select style="width: 100%" placeholder="请选择" v-model="smsTemp.businessType">
								<el-option label="注册" value="VERFIFY_CODE_REGISTER"></el-option>
                                <el-option label="登录" value="VERFIFY_CODE_SINGIN"></el-option>
                                <el-option label="更换手机号" value="VERFIFY_CODE_UPDATE_PHONE"></el-option>
                                <el-option label="重置支付密码" value="VERIFY_CODE_PAY_PASSWORD_RESET"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="模板代码">
							<p>{{smsTemp.businessType}}</p>
						</el-form-item>
						<el-form-item label="模板内容">
							<el-input type="textarea" v-model="smsTemp.templateContent"></el-input>
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
	export default {
		data() {
			return {
				smsTemp: {
                    businessType: '',
                    code: '',
                    templateContent: ''
                },
				appPages: []
			}
		},
		created() {
			this.getSmsTemp()
		},
		methods: {
			editSmsTemp() {
				let data= {
					smsTemplateId: this.$route.query.smsTemplateId,
					businessType: this.smsTemp.businessType,
					code: this.smsTemp.businessType,
					templateContent: this.smsTemp.templateContent,
				}
				console.log(data)
				requestJava({
					url: '/sysSmsTemplate/save',
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
			},
			getSmsTemp() {
				let params = {
					smsTemplateId: this.$route.query.smsTemplateId
				}
				requestJava({
					url: '/sysSmsTemplate/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.smsTemp = res.data.data
					} else {
						Message.error(res.data.message)
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