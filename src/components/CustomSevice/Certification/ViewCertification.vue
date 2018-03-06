<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看实名认证详情</span>
			</div>
			<el-row>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="个人头像">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="memMember.headPicture" :src="'http://develop.we-service.cn/hdd/image/' + memMember.headPicture" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="身份证编号">
							<p v-text="payRealNameApply.idcardNum"></p>
						</el-form-item>
						<el-form-item label="身份证正面">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="payRealNameApply.idcardFrontPic" :src="'http://develop.we-service.cn/hdd/image/' + payRealNameApply.idcardFrontPic" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="姓名">
							<p v-text="payRealNameApply.realName"></p>
						</el-form-item>
						<el-form-item label="单位">
							<p v-text="memMember.plateNoOrCompanyName"></p>
						</el-form-item>
						<el-form-item label="申请时间">
							<p v-text="payRealNameApply.createTime"></p>
						</el-form-item>
						<el-form-item label="身份证背面">
							<el-upload 
								action="" 
								class="avatar-uploader" 
								:show-file-list="false" 
								:disabled="true">
								<img v-if="payRealNameApply.idcardBackPic" :src="'http://develop.we-service.cn/hdd/image/' + payRealNameApply.idcardBackPic" 
								class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="账号">
							<p v-text="memMember.accountCode"></p>
						</el-form-item>
						<el-form-item label="手机号码">
							<p v-text="memMember.mobile"></p>
						</el-form-item>
						
						
						
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="审批人">
							<p v-text="memMember.auditBy"></p>
						</el-form-item>
						<el-form-item label="驳回原因" v-if="payRealNameApply.auditStatus=='Rejected'">
							<p v-text="payRealNameApply.auditFailedReason"></p>
						</el-form-item>
						<el-form-item label="驳回原因" v-else>
							<el-select style="width: 100%" placeholder="如驳回，请选择驳回原因" v-model="payRealNameApply.auditFailedReason" >
								<el-option label="草稿" value="Draft"></el-option>
								<el-option label="已提交" value="Commited"></el-option>
								<el-option label="成功" value="Success"></el-option>
								<el-option label="失败" value="Failed"></el-option>
								<el-option label="已拒绝" value="Rejected"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click.native="approve('')">审核通过</el-button>
							<el-button type="danger" @click.native="approve('Rejected')">驳回</el-button>
							<el-button @click.native="back">返回</el-button>
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
				payRealNameApply:[],
				memMember:[],
				findAuditStatus:'',
				flag:''
			}
		},
		created() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				let params = {
					realNameApplyID: this.$route.query.realNameApplyID,
					memID: this.$route.query.memID
				}
				requestJava({
					url: '/customerservice/payRealNameApply/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.payRealNameApply = res.data.data.payRealNameApply
						this.memMember = res.data.data.memMember
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			back() {
				this.$router.go(-1)
			},
			approve(flag) {
				let data = {
					realNameApplyID: this.$route.query.realNameApplyID,
					flag
				}
				requestJava({
					url: '/customerservice/payRealNameApply/approve',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.msg)
						this.$router.push({name: 'certification'})
					} else {
						Message.error(res.data.message)
					}
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
.avatar-uploader 
	.el-upload 
		border 1px dashed #d9d9d9
		border-radius 6px
		cursor pointer
		position relative
		overflow hidden
		vertical-align top
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