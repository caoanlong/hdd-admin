<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>修改银行</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="银行代码">
							<el-input v-model="bankInfo.supportBankCode"></el-input>
						</el-form-item>
						<el-form-item label="银行名称">
							<el-input v-model="bankInfo.bankName"></el-input>
						</el-form-item>
						<el-form-item label="单笔限额">
							<el-input v-model="bankInfo.perLimit"></el-input>
						</el-form-item>
						<el-form-item label="logo">
							<ImageUpload 
								:files="[bankInfo.logoUrl]" 
								@imgUrlBack="handleLogoUrlSuccess"
								:fixed="true"/>
						</el-form-item>
						<el-form-item label="logo名称">
							<el-input v-model="bankInfo.logoName"></el-input>
						</el-form-item>
						<el-form-item label="背景图片">
                            <ImageUpload 
								:files="[bankInfo.bgUrl]" 
								@imgUrlBack="handleBgUrlSuccess"/>
						</el-form-item>
						<el-form-item label="背景名称">
							<el-input v-model="bankInfo.bgName"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="updateBank">立即保存</el-button>
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
	import ImageUpload from '../../CommonComponents/ImageUpload'
	export default {
		data() {
			return {
				bankInfo: {
                    supportBankCode: '',
					bankName: '',
					perLimit: '',
					logoUrl: '',
					logoName: '',
					bgUrl: '',
					bgName: ''
                }
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
                        console.log(res.data.data)
					} else {
						Message.error(res.data.msg)
					}
				})
            },
			updateBank() {
				let data= {
					supportBankCode: this.bankInfo.supportBankCode,
					bankName: this.bankInfo.bankName,
					perLimit: this.bankInfo.perLimit,
					logoUrl: this.bankInfo.logoUrl,
					logoName: this.bankInfo.logoName,
					bgUrl: this.bankInfo.bgUrl,
                    bgName: this.bankInfo.bgName,
                    oldSupportBankCode: this.$route.query.supportBankCode
				}
				requestJava({
					url: '/paySupportBank/save',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.$router.push({name: 'banklist'})
					} else {
						Message.error(res.data.message)
					}
				})
            },
            handleLogoUrlSuccess(res) {
				this.bankInfo.logoUrl = res
			},
			handleBgUrlSuccess(res) {
				this.bankInfo.bgUrl = res
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
</style>