<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>企业认证</span>
			</div>
			<el-row>
				<el-col :span="16">
					<el-form label-width="160px">
						<el-form-item label="公司名称">
							<p>{{certifyEnterprice.CompanyName}}</p>
						</el-form-item>
						<el-form-item label="详细地址">
							<p>{{certifyEnterprice.DetailAddress}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="所在区域">
							<p>{{certifyEnterprice.FullName}}</p>
						</el-form-item>
						<el-form-item label="道路运输许可证编号" v-if="$route.query.type != 'InfoDept'">
							<p>{{certifyEnterprice.TransportationLicenseCode}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="社会信用代码">
							<p>{{certifyEnterprice.SocialCreditCode}}</p>
						</el-form-item>
						<el-form-item label="门面照片">
							<ImageUpload :files="[certifyEnterprice.CompanyFacadePic]" :isPreview="true"/>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="无车承运平台接入码" v-if="$route.query.type != '3PL' && $route.query.type != 'InfoDept'">
							<p>{{certifyEnterprice.AccessCode}}</p>
						</el-form-item>
						<el-form-item label="营业执照图片">
							<ImageUpload :files="[certifyEnterprice.BusinessLicensePic]" :isPreview="true"/>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="160px">
						<el-form-item label="无车承运平台AppKey" v-if="$route.query.type != '3PL' && $route.query.type != 'InfoDept'">
							<p>{{certifyEnterprice.AppKey}}</p>
						</el-form-item>
						<el-form-item label="道路运输许可证照片" v-if="$route.query.type != 'InfoDept'">
							<ImageUpload :files="[certifyEnterprice.TransportationLicensePic]" :isPreview="true"/>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="160px">
						<el-form-item label="审核说明">
							<el-input type="textarea" v-model="remark"></el-input>
						</el-form-item>
						<el-form-item>
							<span v-if="certifyEnterprice.CertifyStatus != 'Success' && certifyEnterprice.CertifyStatus != 'Draft'">
								<el-button type="success" @click="enterpriceCertify('Success')">通过</el-button>
                            	<el-button type="danger" @click="enterpriceCertify('Failed')">拒绝</el-button>
							</span>
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
				certifyEnterprice: {},
				remark: ''
			}
		},
		created() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				let params = {
					certifyEnterpriceId: this.$route.query.certifyEnterpriceId
				}
				requestJava({
					url: '/mem/memMember/getCertifyEnterpriceInfo',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.certifyEnterprice = res.data.data
					} else {
						Message.error(res.data.message)
					}
				})
			},
			// 企业认证
			enterpriceCertify(status) {
				let data = {
					memId: this.$route.query.memId,
					status: status,
					remark: this.remark,
					SocialCreditCode: this.certifyEnterprice.SocialCreditCode
				}
				requestJava({
					url: '/mem/memMember/approveCertifyEnterprice',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.$router.push({name: 'membercertify'})
					} else {
						Message.error(res.data.message)
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