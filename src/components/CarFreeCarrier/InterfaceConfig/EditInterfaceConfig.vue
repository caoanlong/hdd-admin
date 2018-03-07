<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加无车承运接口配置</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="企业名称">
							<el-select style="width: 100%" placeholder="请选择" v-model="interfaceConfig.businessType">
								<el-option label="注册" value="VERFIFY_CODE_REGISTER"></el-option>
                                <el-option label="登录" value="VERFIFY_CODE_SINGIN"></el-option>
                                <el-option label="更换手机号" value="VERFIFY_CODE_UPDATE_PHONE"></el-option>
                                <el-option label="重置支付密码" value="VERIFY_CODE_PAY_PASSWORD_RESET"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业接入码">
							<p>{{interfaceConfig.businessType}}</p>
						</el-form-item>
                        <el-form-item label="Appkey">
							<p>{{interfaceConfig.businessType}}</p>
						</el-form-item>
                        <el-form-item label="报文功能代码">
							<el-input v-model="interfaceConfig.templateContent"></el-input>
						</el-form-item>
                        <el-form-item label="报文版本号">
							<el-input v-model="interfaceConfig.templateContent"></el-input>
						</el-form-item>
                        <el-form-item label="接收方代码">
							<el-input v-model="interfaceConfig.templateContent"></el-input>
						</el-form-item>
						<el-form-item label="用户">
							<el-select style="width: 100%" placeholder="请选择" v-model="interfaceConfig.businessType">
								<el-option v-for="user in users" :key="user.User_ID" :label="user.Name" :value="user.User_ID"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="updateInterfaceConfig">立即保存</el-button>
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
	import request from '../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				interfaceConfig: {
                    businessType: '',
                    code: '',
                    templateContent: ''
                }
			}
        },
        created() {
			this.getUsers()
        },
		methods: {
			updateInterfaceConfig() {
				let data= {
					userID: this.$route.query.userID,
					businessType: this.interfaceConfig.businessType,
					code: this.interfaceConfig.businessType,
					templateContent: this.interfaceConfig.templateContent,
				}
				console.log(data)
				return
				requestJava({
					url: '/notruckUser/save',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.$router.push({name: 'interfaceconfig'})
					} else {
						Message.error(res.data.message)
					}
				})
			},
			getInterfaceConfig() {
				let params= {
					userID: this.$route.query.userID,
				}
				requestJava({
					url: '/notruckUser/info',
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
			// 获取所有用户
			getUsers() {
				let params = {
					pageSize: 100
				}
				request({
					url: '/sys_user/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.users = res.data.data.rows
						this.getInterfaceConfig()
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