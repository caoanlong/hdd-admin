<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>个人认证</span>
			</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名">
							<p>{{certifyPerson.RealName}}</p>
						</el-form-item>
						<el-form-item label="身份证编号">
							<p>{{certifyPerson.IDCardNum}}</p>
						</el-form-item>
						<el-form-item label="个人头像">
							<ImageUpload :files="[certifyPerson.Picture_Front]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="身份证正面">
							<ImageUpload :files="[certifyPerson.IDCardFrontPic]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="驾驶证正面" v-if="$route.query.type == 'Driver'">
							<ImageUpload :files="[certifyPerson.DriverLicensePic]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="钱包状态">
							<p v-if="certifyPerson.walletStatus == 'Y'">已激活</p>
							<p v-else>未激活</p>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话">
							<p>{{certifyPerson.mobile}}</p>
						</el-form-item>
						<el-form-item label="账户编号">
							<p>{{certifyPerson.AccountCode}}</p>
						</el-form-item>
						<el-form-item label="手持身份证照片">
							<ImageUpload :files="[certifyPerson.IDHandheldPic]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="身份证背面">
							<ImageUpload :files="[certifyPerson.IDCardBackPic]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="驾驶证副本" v-if="$route.query.type == 'Driver'">
							<ImageUpload :files="[certifyPerson.DriverLicenseCopyPic]" :isPreview="true"/>
						</el-form-item>
						<el-form-item label="实名状态">
							<p v-for="realStatus in realNameStatus" :key="realStatus.Dict_ID" v-if="certifyPerson.realNameStatus == realStatus.VALUE">{{realStatus.NAME}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="企业审批状态" v-if="$route.query.type == 'Staff'">
					<p>{{certifyPerson.approvalStatus}}</p>
				</el-form-item>
				<el-form-item label="所在区域" v-if="$route.query.type == 'IndShipper'">
					<p>{{certifyPerson.areaName}}</p>
				</el-form-item>
				<el-form-item label="详细地址" v-if="$route.query.type == 'IndShipper'">
					<p>{{certifyPerson.detailAddress}}</p>
				</el-form-item>
				<el-form-item label="审核说明" v-if="certifyPerson.CertifyStatus != 'Draft'">
					<el-input type="textarea" v-model="remark"></el-input>
				</el-form-item>
				<el-form-item>
					<span>
						<el-button type="primary" 
						@click="realNameCertify" 
						v-if="certifyPerson.realNameStatus == 'Draft' 
						&& certifyPerson.CertifyStatus == 'Success'">实名认证</el-button>
					</span>
					<span v-if="certifyPerson.CertifyStatus == 'Commit'">
						<el-button type="success" @click="persionCertify('Success')">激活</el-button>
						<el-button type="danger" @click="persionCertify('Failed')">拒绝</el-button>
					</span>
					<span style="margin-left:10px">
						<el-button @click="back">返回</el-button>
					</span>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../common/requestJava'
	import request from '../../../common/request'
	import { Message } from 'element-ui'
	import ImageUpload from '../../CommonComponents/ImageUpload'
	export default {
		data() {
			return {
				certifyPerson: {},
				realNameStatus: [],
				remark: ''
			}
		},
		created() {
			this.getRealNameStatus()
		},
		methods: {
			getInfo() {
				let params = {
					certifyPersonId: this.$route.query.certifyPersonId
				}
				requestJava({
					url: '/mem/memMember/getCertifyPersonInfo',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.certifyPerson = res.data.data
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			getRealNameStatus() {
				let params = {
					TYPE: 'realNameStatus',
				}
				request({
					url: '/sys_dict/list/type',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.realNameStatus = res.data.data
						this.getInfo()
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			// 个人认证
			persionCertify(status) {
				let data = {
					memId: this.$route.query.memId,
					status: status,
					remark: this.remark
				}
				requestJava({
					url: '/mem/memMember/approveCertifyPerson',
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
			// 实名认证
			realNameCertify() {
				let data = {
					memId: this.$route.query.memId
				}
				requestJava({
					url: '/mem/memMember/uploadUsrIdCard',
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