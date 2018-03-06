<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>查看提现详情</span>
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
						<el-form-item label="提现金额">
							<p v-text="payCash.money"></p>
						</el-form-item>
						<el-form-item label="提现卡号">
							<p v-text="payCash.bankCardNum"></p>
						</el-form-item>
						<el-form-item label="审批人">
							<p v-text="payCash.auditBy"></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="姓名">
							<p v-text="memMember.realName"></p>
						</el-form-item>
						<el-form-item label="单位">
							<p v-text="memMember.plateNoOrCompanyName"></p>
						</el-form-item>
						<el-form-item label="手续费">
							<p v-text="payCash.fee"></p>
						</el-form-item>
						<el-form-item label="状态">
							<template slot-scope="scope">
								<p v-if="payCash.status=='Draft'">草稿</p>
								<p v-else-if="payCash.status=='ForAudit'">待审核</p>
								<p v-else-if="payCash.status=='Rejected'">已拒绝</p>
								<p v-else-if="payCash.status=='Paying'">处理中</p>
								<p v-else-if="payCash.status=='Success'">成功</p>
								<p v-else>失败</p>
							</template>
						</el-form-item>
						<el-form-item label="审批日期">
							<template slot-scope="scope">
								<p>{{payCash.auditTime | getdatefromtimestamp()}}</p>
							</template>
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
						<el-form-item label="到账金额">
							<p v-text="payCash.money - payCash.fee"></p>
						</el-form-item>
						<el-form-item label="申请日期">
							<template slot-scope="scope">
								<p>{{payCash.cashTime | getdatefromtimestamp()}}</p>
							</template>
						</el-form-item>
						
					</el-form>
				</el-col>
				<el-col :span="24">
					<el-form label-width="120px">
						<el-form-item label="驳回原因" v-if="payCash.status=='Rejected'">
							<p v-text="payCash.auditFailedReason"></p>
						</el-form-item>
						<el-form-item label="失败原因" v-else-if="payCash.status=='Failed'">
							<p v-text="payCash.auditFailedReason"></p>
						</el-form-item>
						<el-form-item>
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
				payCash:[],
				memMember:[]
			}
		},
		created() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				let params = {
					mobile: this.$route.query.mobile,
					cashID:this.$route.query.cashID
				}
				requestJava({
					url: '/payCash/info',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.payCash = res.data.data.payCash
						this.memMember = res.data.data.memMember
						console.log(res.data.data)
					} else {
						Message.error(res.data.msg)
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