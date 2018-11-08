<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加系统配置</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="config" :rules="rules" ref="ruleForm">
						<el-form-item label="代码" prop="Code">
							<el-input auto-complete="off" v-model="config.Code"></el-input>
						</el-form-item>
						<el-form-item label="名称" prop="Name">
							<el-input auto-complete="off" v-model="config.Name"></el-input>
						</el-form-item>
						<el-form-item label="值" prop="Value">
							<el-input auto-complete="off" v-model="config.Value"></el-input>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="config.SortNumber" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item label="描述">
							<el-input auto-complete="off" v-model="config.Description"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addConfig">立即保存</el-button>
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
	export default {
		data() {
			return {
				config: {
					Setting_ID: '',
					Code: '',
					Name: '',
					Value: '',
					SortNumber: '',
					Description: ''
				},
				rules: {
					Code: [
						{required: true, message: '请输入代码'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Name: [
						{required: true, message: '请输入名称'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					Value: [
						{required: true, message: '请输入值'},
						{min: 1, max: 50, message: '长度在 1 到 50 个字符'}
					]
				}
			}
		},
		activated() {
			if(!this.$route.query.cache) {
				this.config = {
					Setting_ID: '',
					Code: '',
					Name: '',
					Value: '',
					SortNumber: '',
					Description: ''
				}
			}
		},
		methods: {
			addConfig() {
				let data= {
					Code: this.config.Code,
					Name: this.config.Name,
					Value: this.config.Value,
					SortNumber: this.config.SortNumber,
					Description: this.config.Description
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						request({
							url: '/sys_settings/add',
							method: 'post',
							data
						}).then(res => {
							if (res.data.code == 0) {
								Message.success(res.data.msg)
								this.$router.push({name: 'sysconfigmanage'})
							} else {
								Message.error(res.data.msg)
							}
						})
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