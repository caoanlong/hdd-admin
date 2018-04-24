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
							<p>{{user.memberID}}</p>
						</el-form-item>
						<el-form-item label="用户名">
							<p>{{user.userName}}</p>
						</el-form-item>
						<el-form-item label="联系人">
							<p>{{user.contact}}</p>
						</el-form-item>
						<el-form-item label="公司名称">
							<p>{{user.companyName}}</p>
						</el-form-item>
						<el-form-item label="公司地址">
							<p>{{user.companyArea + user.detailAddress}}</p>
						</el-form-item>
						<el-form-item label="申请时间">
							<p v-if="user.applyTime">{{user.applyTime | getdatefromtimestamp()}}</p>
							<p v-else></p>
						</el-form-item>
						<el-form-item label="通过时间">
							<p v-if="user.auditTime">{{user.auditTime | getdatefromtimestamp()}}</p>
							<p v-else></p>
						</el-form-item>
						<el-form-item label="经营许可证号">
							<p v-if="user.auditStatus != 'Pending'">{{user.businessLicNo}}</p>
							<el-input v-else v-model="user.businessLicNo"></el-input>
						</el-form-item>
						<el-form-item label="公司LOGO">
							<ImageUpload 
								:isPreview="user.auditStatus != 'Pending'"
								:width="160" :height="40" 
								:fixed="true" 
								:fixedNumber="[4, 1]" 
								:files="[user.logoUrl]" 
								@imgUrlBack="handleLogoUrlSuccess"/>
						</el-form-item>
						<el-form-item label="运输许可证">
							<ImageUpload 
								:isPreview="user.auditStatus != 'Pending'"
								:width="200" :height="120"
								:files="[user.roadTransportLicUrl]" 
								@imgUrlBack="handleRoadTransportLicUrlSuccess"/>
						</el-form-item>
						<el-form-item label="营业执照图片">
							<ImageUpload 
								:isPreview="user.auditStatus != 'Pending'"
								:width="200" :height="120"
								:files="[user.businessLicUrl]" 
								@imgUrlBack="handleBusinessLicUrlSuccess"/>
						</el-form-item>
						<el-form-item label="备注">
							<el-input type="textarea" :disabled="user.auditStatus != 'Pending'" v-model="user.remark"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item>
							<el-button type="success" v-if="user.auditStatus == 'Pending'" @click="audit('Passed')">通过</el-button>
							<el-button type="danger" v-if="user.auditStatus == 'Pending'" @click="audit('Rejected')">拒绝</el-button>
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
	import ImageUpload from '../../../CommonComponents/ImageUpload'
	export default {
		data() {
			return {
				user: {
					memberID: '',
					userName: '',
					contact: '',
					companyName: '',
					companyArea: '',
					roadTransportLicUrl: '',
					businessLicUrl: '',
					remark: ''
				}
			}
        },
        created() {
            this.getInfo()
        },
		methods: {
            getInfo() {
                let params= {
					applyRecordID: this.$route.query.applyRecordID
				}
				requestJava({
					url: '/admin/applyrecord/info',
					params
				}).then(res => {
					this.user = res.data.data
					this.user.roadTransportLicUrl = res.data.data.roadTransportLicUrl
					this.user.businessLicUrl = res.data.data.businessLicUrl
				})
			},
			handleLogoUrlSuccess(res) {
				this.user.logoUrl = res[0]
			},
			handleRoadTransportLicUrlSuccess(res) {
				this.user.roadTransportLicUrl = res[0]
			},
			handleBusinessLicUrlSuccess(res) {
				this.user.businessLicUrl = res[0]
			},
			audit(status) {
				let data = {
					BusinessLicUrl: this.user.businessLicUrl, //	运输许可证图片	string	
					RoadTransportLicUrl: this.user.roadTransportLicUrl, //	营业执照图片	string	
					applyRecordID: this.user.applyRecordID, //	审核ID	number	
					auditStatus: status, //	审核状态	string	Draft :草稿 ；Pending :待审核；Passed：已开通；Rejected：已拒绝
					businessLicNo: this.user.businessLicNo, //	许可证号码	string	
					remark: this.user.remark,
					logoUrl: this.user.logoUrl
				}
				requestJava({
					url: '/admin/applyrecord/auditing',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.msg)
						this.$router.push({name: 'tmsusermanage'})
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