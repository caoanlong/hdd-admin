<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户详情</span>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
					<el-form-item label="用户ID">
						<p>{{bankInfo.supportBankCode}}</p>
					</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="用户名">
							<p>{{bankInfo.bankName}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="联系人">
							<p>{{bankInfo.perLimit}}</p>
						</el-form-item>
						
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
					<el-form-item label="公司名称">
						<p>{{bankInfo.perLimit}}</p>
					</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="16">
					<el-form label-width="120px">
						<el-form-item label="公司地址">
							<p>{{bankInfo.perLimit}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="申请时间">
							<p>{{bankInfo.perLimit}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="通过时间">
							<p>{{bankInfo.perLimit}}</p>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="运输许可证">
							<el-upload class="avatar-uploader" action="http://39.108.245.177:3001/uploadImg"  @click.native="previewImg(bankInfo.logoUrl)"  :disabled="true"  :show-file-list="false">
								<img v-if="bankInfo.logoUrl" :src="bankInfo.logoUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="营业执照">
                            <el-upload 
								class="avatar-uploader"
								action="http://39.108.245.177:3001/uploadImg" 
								@click.native="previewImg(bankInfo.logoUrl)" 
								:disabled="true" 
								:show-file-list="false">
								<img v-if="bankInfo.logoUrl" :src="bankInfo.logoUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="备注">
							<p>{{bankInfo.perLimit}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button type="success">通过</el-button>
							<el-button type="danger">拒绝</el-button>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				bankInfo: {}
			}
        },
        created() {
            this.getBank()
        },
		methods: {
            getBank() {
                let params= {
					supportBankCode: this.$route.query.supportBankCode,
				}
				requestJava({
					url: '/paySupportBank/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
                        this.bankInfo = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			previewImg(imgUrl) {
				this.$alert(`<img style="width: 100%" src=${imgUrl} />`, '图片预览', {
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
					customClass: 'img-preview'
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