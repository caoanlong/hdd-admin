<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看银行</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="银行代码">
							<p>{{bankInfo.supportBankCode}}</p>
						</el-form-item>
						<el-form-item label="银行名称">
							<p>{{bankInfo.bankName}}</p>
						</el-form-item>
						<el-form-item label="单笔限额">
							<p>{{bankInfo.perLimit}}</p>
						</el-form-item>
						<el-form-item label="单日限额">
							<p>{{bankInfo.dailyLimit}}</p>
						</el-form-item>
						<el-form-item label="logo" prop="logoUrl">
							<ImageUpload :files="[bankInfo.logoUrl]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="logo名称">
							<p>{{bankInfo.logoName}}</p>
						</el-form-item>
						<el-form-item label="背景图片">
							<ImageUpload :files="[bankInfo.bgUrl]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="背景名称">
							<p>{{bankInfo.bgName}}</p>
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
	import ImageUpload from '../../CommonComponents/ImageUpload'
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
			back() {
				this.$router.go(-1)
			}
		},
		components: {
			ImageUpload
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