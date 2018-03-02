<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加银行</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="银行代码">
							<el-input v-model="bankInfo.ForwardURL"></el-input>
						</el-form-item>
						<el-form-item label="银行名称">
							<el-input v-model="bankInfo.JSONForward"></el-input>
						</el-form-item>
						<el-form-item label="单笔限额">
							<el-input v-model="bankInfo.Code"></el-input>
						</el-form-item>
						<el-form-item label="logo">
                            <el-upload 
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg"  
								:show-file-list="false" 
								:on-success="handleAvatarSuccess">
								<img v-if="bankInfo.Name" :src="bankInfo.Name" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="logo名称">
							<el-input v-model="bankInfo.Title"></el-input>
						</el-form-item>
						<el-form-item label="背景图片">
                            <el-upload 
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg"  
								:show-file-list="false" 
								:on-success="handleAvatarSuccess">
								<img v-if="bankInfo.IconURL" :src="bankInfo.IconURL" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="背景名称">
							<el-input v-model="bankInfo.Content"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="addBank">立即保存</el-button>
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
				bankInfo: {}
			}
		},
		methods: {
			addBank() {
				let data= {
					AppPage_ID: this.bankInfo.AppPage_ID,
					ForwardURL: this.bankInfo.ForwardURL,
					JSONForward: this.bankInfo.JSONForward,
					Name: this.bankInfo.Name,
					Code: this.bankInfo.Code,
					Title: this.bankInfo.Title,
					IconURL: this.bankInfo.IconURL,
					Content: this.bankInfo.Content,
					JSONSample: this.bankInfo.JSONSample,
					PushType: this.bankInfo.PushType
				}
				requestJava({
					url: '/set_messagetemplate/add',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						Message.success(res.data.msg)
						this.$router.push({name: 'banklist'})
					} else {
						Message.error(res.data.msg)
					}
				})
            },
            handleAvatarSuccess(res, file) {
				this.bankInfo.Name = 'http://39.108.245.177:4000' + res.data
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