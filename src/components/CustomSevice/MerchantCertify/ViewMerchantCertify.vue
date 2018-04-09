<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看商户认证详情</span>
			</div>
            <el-form label-width="160px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="企业名称">
							<p>{{meechantCertify.companyName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="企业邮箱">
							<p>{{meechantCertify.companyEmail}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="企业成立时间">
							<p>{{meechantCertify.companyCreateDate | getdatefromtimestamp(true)}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="营业执照照片">
							<ImageUpload :isPreview="true" :files="[imgUrl + meechantCertify.businessLicensePic]"/>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="营业执照有效开始日期">
							<p>{{meechantCertify.businessLicenseRegDate | getdatefromtimestamp(true)}}</p>
						</el-form-item>
                        <el-form-item label="营业执照有效截止日期">
							<p>{{meechantCertify.businessLicenseExpireDate | getdatefromtimestamp(true)}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="信用代码">
							<p>{{meechantCertify.socialCreditCode}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="法人姓名">
							<p>{{meechantCertify.realName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证号">
							<p>{{meechantCertify.idCardNum}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="身份证正面照">
							<ImageUpload :isPreview="true" :files="[imgUrl + meechantCertify.idCardFrontPic]"/>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证背面照">
							<ImageUpload :isPreview="true" :files="[imgUrl + meechantCertify.idCardBackPic]"/>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="身份证开始有效期">
							<p>{{meechantCertify.idCardBeginDate | getdatefromtimestamp(true)}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身份证结束有效期">
							<p>{{meechantCertify.idCardEndDate | getdatefromtimestamp(true)}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开户银行银联号">
							<p>{{meechantCertify.bankBranchCode}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="支付支持银行代码">
							<p>{{meechantCertify.supportBankCode}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="开户卡号">
							<p>{{meechantCertify.bankCardNum}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="开户银行户名">
							<p>{{meechantCertify.bandkCustName}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="银行卡正面照">
							<ImageUpload :isPreview="true" :files="[imgUrl + meechantCertify.bankCardFrontPic]"/>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="银行卡背面照">
							<ImageUpload :isPreview="true" :files="[imgUrl + meechantCertify.bankCardBackPic]"/>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="审核人">
							<p>{{meechantCertify.auditByName}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="创建时间">
							<p>{{meechantCertify.createTime | getdatefromtimestamp()}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="是否有效">
							<p>{{meechantCertify.isInvalid == 'N' ? '是' : '否'}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="审核时间">
							<p>{{meechantCertify.auditTime | getdatefromtimestamp()}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审批状态">
							<p v-if="meechantCertify.auditStatus == auditStatus.VALUE" v-for="auditStatus in auditStatusList" :key="auditStatus.Dict_ID">{{auditStatus.NAME}}</p>
						</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审核失败原因">
							<p>{{meechantCertify.auditFailedReason}}</p>
						</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <!-- <el-form-item label="驳回原因" v-if="meechantCertify.auditStatus == 'Rejected'">
                        <p v-text="meechantCertify.auditFailedReason"></p>
                    </el-form-item> -->
                    <el-form-item label="驳回原因" v-if="meechantCertify.auditStatus == 'Commited'">
						<el-input type="textarea" v-model="meechantCertify.auditFailedReason"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="approve('Success')" v-if="meechantCertify.auditStatus == 'Commited'">审核通过</el-button>
                        <el-button type="danger" @click="approve('Rejected')" v-if="meechantCertify.auditStatus == 'Commited'">驳回</el-button>
                        <el-button @click="back">返回</el-button>
                    </el-form-item>
			    </el-row>
            </el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
	import request from '../../../common/request'
	import requestJava from '../../../common/requestJava'
    import { Message } from 'element-ui'
    import ImageUpload from '../../CommonComponents/ImageUpload'
	export default {
		data() {
			return {
				meechantCertify: {},
				auditStatusList: []
			}
		},
		created() {
			this.getAuditStatus()
		},
		methods: {
			getInfo() {
				let params = {
					businessApplyID: this.$route.query.businessApplyID
				}
				requestJava({
					url: '/payBusinessApply/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.meechantCertify = res.data.data
					} else {
						Message.error(res.data.message)
					}
				})
			},
			getAuditStatus() {
				let params = {
					TYPE: 'payRealNameApply_auditStatus'
				}
				request({
					url: '/sys_dict/list/type',
					method: 'get',
					params
				}).then(res => {
					this.auditStatusList = res.data.data
					this.getInfo()
				})
			},
			back() {
				this.$router.go(-1)
			},
			approve(auditStatus) {
				let data = {
					businessApplyID: this.$route.query.businessApplyID,
					auditFailedReason: this.meechantCertify.auditFailedReason,
					auditStatus
				}
				requestJava({
					url: '/payBusinessApply/approve',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.message)
						this.$router.push({name: 'merchantcertify'})
					} else {
						Message.error(res.data.message)
					}
				})
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