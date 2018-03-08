<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>个人认证</span>
			</div>
			<el-row>
				<el-col :span="12">
					<el-form label-width="120px">
                        <el-form-item label="姓名">
							<p>{{certifyPerson.RealName}}</p>
						</el-form-item>
						<el-form-item label="身份证编号">
							<p>{{certifyPerson.IDCardNum}}</p>
						</el-form-item>
						<el-form-item label="个人头像">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="certifyPerson.Picture_Front" :src="'http://develop.we-service.cn/hdd/image/' + certifyPerson.Picture_Front" class="avatar">
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="身份证正面">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="certifyPerson.IDCardFrontPic" :src="'http://develop.we-service.cn/hdd/image/' + certifyPerson.IDCardFrontPic" class="avatar">
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="钱包状态">
							<p v-if="certifyPerson.walletStatus == 'Y'">已激活</p>
							<p v-else>未激活</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="12">
					<el-form label-width="120px">
                        <el-form-item label="联系电话">
							<p>13049497395</p>
						</el-form-item>
						<el-form-item label="账户编号">
							<p>68435131313464</p>
						</el-form-item>
						<el-form-item label="手持身份证照片">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="certifyPerson.IDHandheldPic" :src="'http://develop.we-service.cn/hdd/image/' + certifyPerson.IDHandheldPic" class="avatar">
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="身份证背面">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="certifyPerson.IDCardBackPic" :src="'http://develop.we-service.cn/hdd/image/' + certifyPerson.IDCardBackPic" class="avatar">
								<i class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="实名状态">
							<p v-for="realStatus in realNameStatus" :key="realStatus.Dict_ID" v-if="certifyPerson.realNameStatus == realStatus.VALUE">{{realStatus.NAME}}</p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
                        <el-form-item label="审核说明" v-if="certifyPerson.walletStatus == 'N'">
							<el-input type="textarea" v-model="remark"></el-input>
						</el-form-item>
						<el-form-item>
							<span v-if="certifyPerson.walletStatus == 'Y'">
								<el-button type="primary" 
								@click="realNameCertify" 
								v-if="certifyPerson.realNameStatus == 'Failed' || certifyPerson.realNameStatus == 'Rejected' || certifyPerson.realNameStatus == 'Draft'">实名认证</el-button>
							</span>
							<span v-else>
								<el-button type="success" @click="persionCertify('Success')">激活</el-button>
                            	<el-button type="danger" @click="persionCertify('Failed')">拒绝</el-button>
							</span>
							<span>
								<el-button @click="back">返回</el-button>
							</span>
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
			// 个人认证(激活)
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
					memID: this.$route.query.memId
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