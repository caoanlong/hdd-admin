<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看短信模板</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="企业名称">
                            <p>注册</p>
						</el-form-item>
						<el-form-item label="企业接入码">
							<p>{{interfaceConfig.code}}</p>
						</el-form-item>
						<el-form-item label="Appkey">
							<p>{{interfaceConfig.Appkey}}</p>
						</el-form-item>
                        <el-form-item label="报文功能代码">
							<p>{{interfaceConfig.templateContent}}</p>
						</el-form-item>
                        <el-form-item label="报文版本号">
							<p>{{interfaceConfig.templateContent}}</p>
						</el-form-item>
                        <el-form-item label="接收方代码">
							<p>{{interfaceConfig.templateContent}}</p>
						</el-form-item>
						<el-form-item>
							<el-button @click="back">返回</el-button>
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
				interfaceConfig: {}
			}
		},
		created() {
			// this.getSmsTemp()
		},
		methods: {
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
						this.interfaceConfig = res.data.data
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