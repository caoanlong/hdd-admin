<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>提现审核</span>
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
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="提现金额">
							<p v-text="payCash.money"></p>
						</el-form-item>
						<el-form-item label="手续费">
							<p v-text="payCash.fee"></p>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
						<el-form-item label="到账金额">
							<p v-text="payCash.money - payCash.fee"></p>
						</el-form-item>
						<el-form-item label="提现卡号">
							<p v-text="payCash.bankCardNum"></p>
						</el-form-item>	
					</el-form>
				</el-col>
				<el-col :span="8">
					<el-form label-width="120px">
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
						<el-form-item label="申请日期">
							<template slot-scope="scope">
								<p>{{payCash.cashTime | getdatefromtimestamp()}}</p>
							</template>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card" style="margin-top:20px">
			<div slot="header" class="clearfix">
				<span>近期流水</span>
			</div>
			<div class="table">
				<el-table :data="auditPageList" border style="width: 100%" size="mini">
					<el-table-column label="日期" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="款项名称" align="center" prop="billType" width="100">
					</el-table-column>
					<el-table-column label="收支类型" prop="type">
					</el-table-column>
					<el-table-column label="对方账号" align="center" prop="oppositeMobile">
					</el-table-column>
					<el-table-column label="对方姓名" align="center" prop="oppositeName" width="140">
					</el-table-column>
					<el-table-column label="金额" prop="amount" width="180">
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="auditPage()">
							<el-option label="10" value="10"></el-option>
							<el-option label="20" value="20"></el-option>
							<el-option label="30" value="30"></el-option>
							<el-option label="40" value="40"></el-option>
							<el-option label="50" value="50"></el-option>
							<el-option label="100" value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
		<el-card class="box-card" style="margin-top:20px">
			<div slot="header" class="clearfix">
				<span>审核操作</span>
			</div>
			<el-col :span="24">
				<el-form label-width="120px">
					<el-form-item label="驳回原因">
						<el-input type="textarea" placeholder="如果驳回，请填写驳回原因" v-model="payCash.auditFailedReason" resize="none"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click="audit($route.query.cashID, '0')">同意</el-button>
						<el-button type="danger"  @click="audit($route.query.cashID, '1')">驳回</el-button>
						<el-button type="default" @click.native="back">返回</el-button>
					</el-form-item>
				</el-form>
			</el-col>
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
				memMember:[],
				auditPagePayCash:[],
				auditPagePayWalletBill:[],
				auditPageMemMember:[],
				auditPageList:[],
				pageNum: 1,
				pageSize: 10,
				count: 0
			}
		},
		created() {
			this.getInfo()
			this.auditPage()
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
			auditPage(pageNum) {
				let params = {
					pageNum: pageNum || 1,
					pageSize: this.pageSize,
					mobile: this.$route.query.mobile,
					id:this.$route.query.cashID
				}
				requestJava({
					url: '/payCash/auditPage',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.auditPagePayCash = res.data.data.payCash
						this.auditPagePayWalletBill = res.data.data.payWalletBill
						this.auditPageMemMember = res.data.data.memMember
						this.auditPageList = res.data.data.page.list
						this.count = res.data.data.page.total
						console.log(res.data.data)
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			pageChange(index) {
				this.auditPage(index)
			},
			back() {
				this.$router.go(-1)
			},
			audit(cashID, flag) {
				let data = {
					cashID,
					flag
				}
				requestJava({
					url: '/payCash/audit',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 200) {
						Message.success(res.data.msg)
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