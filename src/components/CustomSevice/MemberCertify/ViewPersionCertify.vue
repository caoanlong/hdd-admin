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
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话">
							<p>{{certifyPerson.mobile}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="身份证编号">
							<p>{{certifyPerson.IDCardNum}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="账户编号">
							<p>{{certifyPerson.AccountCode}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="钱包状态">
							<p v-if="certifyPerson.walletStatus == 'Y'">已激活</p>
							<p v-else>未激活</p>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="实名状态">
							<p v-for="realStatus in realNameStatus" :key="realStatus.Dict_ID" v-if="certifyPerson.realNameStatus == realStatus.VALUE">{{realStatus.NAME}}</p>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<div class="tit">
						<div style="margin-left: 0">个人头像</div>
						<div>手持身份证照片</div>
						<div>身份证正面</div>
						<div>身份证背面</div>
						<div v-if="$route.query.type == 'Driver'">驾驶证正面</div>
						<div v-if="$route.query.type == 'Driver'">驾驶证副本</div>
					</div>
					<div class="gridly">
						<div class="brick" data-attribute="Picture_Front">
							<ImageUpload :files="[certifyPerson.Picture_Front]" :isUseCropper="false" @imgUrlBack="handlePicture_FrontSuccess"/>
						</div>
						<div class="brick" data-attribute="IDHandheldPic">
							<ImageUpload :files="[certifyPerson.IDHandheldPic]" :isUseCropper="false" @imgUrlBack="handleIDHandheldPicSuccess"/>
						</div>
						<div class="brick" data-attribute="IDCardFrontPic">
							<ImageUpload :files="[certifyPerson.IDCardFrontPic]" :isUseCropper="false" @imgUrlBack="handleIDCardFrontPicSuccess"/>
						</div>
						<div class="brick" data-attribute="IDCardBackPic">
							<ImageUpload :files="[certifyPerson.IDCardBackPic]" :isUseCropper="false" @imgUrlBack="handleIDCardBackPicSuccess"/>
						</div>
						<div class="brick" data-attribute="DriverLicensePic" v-if="$route.query.type == 'Driver'">
							<ImageUpload :files="[certifyPerson.DriverLicensePic]" :isUseCropper="false" @imgUrlBack="handleDriverLicensePicSuccess"/>
						</div>
						<div class="brick" data-attribute="DriverLicenseCopyPic" v-if="$route.query.type == 'Driver'">
							<ImageUpload :files="[certifyPerson.DriverLicenseCopyPic]" :isUseCropper="false" @imgUrlBack="handleDriverLicenseCopyPicSuccess"/>
						</div>
					</div>
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
					</span>
					<span v-if="certifyPerson.CertifyStatus == 'Commit'">
						<el-button type="danger" @click="persionCertify('Failed')">拒绝</el-button>
					</span>
					<span>
						<el-button type="primary" @click="update()">保存</el-button>
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
				remark: '',
				updateImgs: {}
			}
		},
		created() {
			this.getRealNameStatus()
		},
		mounted() {
			this._initImage()
		},
		methods: {
			_initImage() {
				var _this = this
				$(function() {
					var before = []
					var after = []
					var reordering = function($elements) {
						before = $elements
					}
					var reordered = function($elements) {
						after = $elements
						for (let i = 0; i < before.length; i++) {
							let $img1 = $(before[i]).find('img')
							let $img2 = $(after[i]).find('img')
							_this.updateImgs[$img1.context.dataset.attribute] = $img2.attr('src').split(_this.imgUrl)[1]
						}
					}
					$('.gridly').gridly({
						callbacks: { reordering: reordering , reordered: reordered }
					})
				})
			},
			handlePicture_FrontSuccess(res) {
				this.updateImgs['Picture_Front'] = res[0]
			},
			handleIDHandheldPicSuccess(res) {
				this.updateImgs['IDHandheldPic'] = res[0]
			},
			handleIDCardFrontPicSuccess(res) {
				this.updateImgs['IDCardFrontPic'] = res[0]
			},
			handleIDCardBackPicSuccess(res) {
				this.updateImgs['IDCardBackPic'] = res[0]
			},
			handleDriverLicensePicSuccess(res) {
				this.updateImgs['DriverLicensePic'] = res[0]
			},
			handleDriverLicenseCopyPicSuccess(res) {
				this.updateImgs['DriverLicenseCopyPic'] = res[0]
			},
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
						this.updateImgs['DriverLicenseCopyPic'] = res.data.data.DriverLicenseCopyPic
						this.updateImgs['DriverLicensePic'] = res.data.data.DriverLicensePic
						this.updateImgs['IDCardBackPic'] = res.data.data.IDCardBackPic
						this.updateImgs['IDCardFrontPic'] = res.data.data.IDCardFrontPic
						this.updateImgs['IDHandheldPic'] = res.data.data.IDHandheldPic
						this.updateImgs['Picture_Front'] = res.data.data.Picture_Front
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
			update() {
				let data = {
					certifyPersonID: this.$route.query.certifyPersonId,
					driverLicenseCopyPic: this.updateImgs['DriverLicenseCopyPic'],
					driverLicensePic: this.updateImgs['DriverLicensePic'],
					iDCardBackPic: this.updateImgs['IDCardBackPic'],
					iDCardFrontPic: this.updateImgs['IDCardFrontPic'],
					iDHandheldPic: this.updateImgs['IDHandheldPic'],
					pictureFront: this.updateImgs['Picture_Front']
				}
				requestJava({
					url: '/mem/memMember/updateCertifyPerson',
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
<style lang="stylus" scoped>
	.gridly, .gridly > :not(.dragging)
		-webkit-transition all 0.4s ease-in-out
		-moz-transition all 0.4s ease-in-out
		transition all 0.4s ease-in-out
	.gridly
		position relative
		width 960px
		margin 0 auto
		.dragging
			z-index 800
		.brick
			width 100px
			height 100px
	.tit
		display flex
		position relative
		width 960px
		margin 0 auto
		div
			flex 0 0 100px
			margin-left 60px
			width 100px
			text-align center
			height 40px
			line-height 40px
			font-size 13px
			font-weight 700
			color #606266
</style>
