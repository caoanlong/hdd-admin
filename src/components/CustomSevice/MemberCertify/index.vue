<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>会员列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="会员类型">
						<el-select placeholder="请选择" v-model="find.memberType">
							<el-option v-for="memberType in memberTypes" :key="memberType.Dict_ID" :label="memberType.NAME" :value="memberType.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字">
						<el-input placeholder="请输入..." v-model="find.keyword"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="find.memberStatus">
							<el-option label="启用" value="N"></el-option>
							<el-option label="封停" value="Y"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="认证状态">
						<el-select placeholder="请选择" v-model="find.certifyStatus">
							<el-option v-for="cerStatus in certifyStatus" :key="cerStatus.VALUE" :label="cerStatus.NAME" :value="cerStatus.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="钱包状态">
						<el-select placeholder="请选择" v-model="find.walletStatus">
							<el-option label="已激活" value="Y"></el-option>
							<el-option label="未激活" value="N"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="实名状态">
						<el-select placeholder="请选择" v-model="find.realNameStatus">
							<el-option v-for="realStatus in realNameStatus" :key="realStatus.VALUE" :label="realStatus.NAME" :value="realStatus.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="注册时间">
						<el-date-picker 
							v-model="findDataRange" 
							type="daterange" 
							range-separator="至" 
							start-placeholder="开始日期" 
							end-placeholder="结束日期" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="会员类型" width="100" align="center">
						<template slot-scope="scope">
							<span v-for="memberType in memberTypes" :key="memberType.Dict_ID" v-if="scope.row.type == memberType.VALUE">{{memberType.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="姓名" prop="realName" width="90" align="center"></el-table-column>
					<el-table-column label="手机号" align="center" prop="mobile" width="100"></el-table-column>
					<el-table-column label="车牌/企业名" prop="companyOrPlateNo"></el-table-column>
					<el-table-column label="所属企业" prop="companyName"></el-table-column>
					<el-table-column label="注册时间" align="center" prop="regDate" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" align="center" width="80">
						<template slot-scope="scope">
							<span>{{scope.row.status == 'Y' ? '封停' : '启用'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="认证人" align="center">
						<template slot-scope="scope">
							<span>
								<span>{{scope.row.certifyByPersonName}}</span>
							</span>
							<span v-if="scope.row.certifyByPersonName && scope.row.certifyCertifyByName">/</span>
							<span>
								<span>{{scope.row.certifyCertifyByName}}</span>
							</span>
						</template>
					</el-table-column>
					<el-table-column label="认证状态" width="120" align="center">
						<template slot-scope="scope">
							<span>
								<span v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" v-if="scope.row.memCertifyPerson && (scope.row.memCertifyPerson.certifyStatus == cerStatus.VALUE)">{{cerStatus.NAME}}</span>
							</span>
							<span v-if="(scope.row.memCertifyPerson && scope.row.memCertifyPerson.certifyStatus) && (scope.row.memTruckCertify && scope.row.memTruckCertify.certifyStatus)">/</span>
							<span v-if="scope.row.type != 'IndShipper'">
								<span v-for="cerStatus in certifyStatus" :key="cerStatus.Dict_ID" v-if="scope.row.memTruckCertify && (scope.row.memTruckCertify.certifyStatus == cerStatus.VALUE)">{{cerStatus.NAME}}</span>
							</span>
						</template>
					</el-table-column>
					<el-table-column label="钱包状态" align="center" width="80">
						<template slot-scope="scope">
							<span>{{scope.row.walletStatus == 'Y' ? '已激活' : '未激活'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="实名状态" align="center" width="80">
						<template slot-scope="scope">
							<span v-for="realStatus in realNameStatus" :key="realStatus.Dict_ID" v-if="scope.row.realNameStatus == realStatus.VALUE">{{realStatus.NAME}}</span>
						</template>
					</el-table-column>
					<el-table-column label="账号类型" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.accountType == 'CompanyAccount'">公司账户</span>
							<span v-else-if="scope.row.accountType == 'PersonalAccount'">个人账户</span>
							<span v-else>个人账户</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="220" fixed="right">
						<template slot-scope="scope">
							<el-button type="default" size="mini" 
								@click="viewPersionCertify(scope.row.certifyPersonId, scope.row.memId, scope.row.type)" 
								v-if="scope.row.type != 'Tourist' && scope.row.memCertifyPerson">
								<svg-icon icon-class="file-icon"></svg-icon> 个人
							</el-button>
							<el-button type="default" size="mini" 
								@click="viewCompanyCertify(scope.row.certifyEnterpriceId, scope.row.memId, scope.row.type)" 
								v-if="(scope.row.type == 'NoTruck' || scope.row.type == '3PL' || scope.row.type == 'InfoDept') && scope.row.memTruckCertify">
								<svg-icon icon-class="file-icon"></svg-icon> 企业
							</el-button>
							<el-button type="default" size="mini" 
								@click="viewTruckCertify(scope.row.truckCertifyId, scope.row.memId)" 
								v-if="scope.row.type == 'Driver' && scope.row.memTruckCertify">
								<svg-icon icon-class="file-icon"></svg-icon> 车辆
							</el-button>
							<el-button type="default" size="mini" v-if="scope.row.status=='N'" @click="updateStatus(scope.row.memId, 'Y')">
								<svg-icon icon-class="stop-icon"></svg-icon> 封停
							</el-button>
							<el-button type="default" size="mini" v-else @click="updateStatus(scope.row.memId, 'N')">
								<svg-icon icon-class="start-icon"></svg-icon> 启用
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import { PAGEINDEX, PAGESIZE } from '../../../common/const'
import request from '../../../common/request'
import { javaUrl } from '../../../common/requestJava'
import { baseMixin } from '../../../common/mixin'
import Member from '../../../api/Member'
export default {
    mixins: [baseMixin],
	data() {
		return {
			find: {
				memberType: '',
				keyword: '',
				memberStatus: '',
				certifyStatus: '',
				walletStatus: '',
				realNameStatus: '',
				startDate: '',
				endDate: ''
			},
			findDataRange: [],
			memberTypes: [],
			certifyStatus: [],
			realNameStatus: [],
			exportExcelUrl: '',
		}
	},
	created() {
		this.find = JSON.parse(sessionStorage.getItem('find')) || {}
		if (this.find.startDate && this.find.endDate) this.findDataRange = [this.find.startDate, this.find.endDate]
		this.getMemberTypes()
		this.getCertifyStatus()
		this.getRealNameStatus()
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		search() {
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			sessionStorage.setItem('find', JSON.stringify(this.find))
			this.resetExportExcelUrl()
			this.getList()
		},
		reset() {
			sessionStorage.removeItem('find')
			this.find.memberType = ''
			this.find.keyword = ''
			this.find.memberStatus = ''
			this.find.certifyStatus = ''
			this.find.realNameStatus = ''
			this.find.walletStatus = ''
			this.findDataRange = []
			this.find.startDate = ''
			this.find.endDate = ''
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.resetExportExcelUrl()
			this.getList()
		},
		getMemberTypes() {
			const params = { TYPE: 'memberType' }
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.memberTypes = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getCertifyStatus() {
			const params = { TYPE: 'CertifyStatus' }
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.certifyStatus = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		getRealNameStatus() {
			const params = { TYPE: 'realNameStatus' }
			request({
				url: '/sys_dict/list/type',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.realNameStatus = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		selectDateRange(date) {
			this.find.startDate = new Date(date[0]).getTime()
			this.find.endDate = new Date(date[1]).getTime()
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = javaUrl + '/mem/memMember/export?Authorization=' + localStorage.getItem("token") 
				+ '&pageNum=' + this.pageIndex 
				+ '&pageSize=' + this.pageSize 
				+ '&type=' + this.find.memberType 
				+ '&keyword=' + this.find.keyword 
				+ '&status=' + this.find.memberStatus 
				+ '&certifyStatus=' + this.find.certifyStatus 
				+ '&realNameStatus=' + this.find.realNameStatus 
				+ '&walletStatus=' + this.find.walletStatus 
				+ '&createBeginDate=' + this.startDate 
				+ '&createEndDate=' + this.endDate
		},
		getList() {
			Member.find({
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				type: this.find.memberType,
				keyword: this.find.keyword,
				status: this.find.memberStatus,
				certifyStatus: this.find.certifyStatus,
				realNameStatus: this.find.realNameStatus,
				walletStatus: this.find.walletStatus,
				createBeginDate: this.find.startDate,
				createEndDate: this.find.endDate
			}).then(res => {
				this.total = res.total
				this.tableData = res.list
			})
		},
		updateStatus(memId, status) {
			Member.updateStatus({
				memId,
				status
			}).then(res => {
				Message.success(res.data.message)
				this.getList()
			})
		},
		viewPersionCertify(certifyPersonId, memId, type) {
			this.$router.push({name: 'viewpersioncertify', query: {certifyPersonId, memId, type}})
		},
		viewCompanyCertify(certifyEnterpriceId, memId, type) {
			this.$router.push({name: 'viewcompanycertify', query: {certifyEnterpriceId, memId, type}})
		},
		viewTruckCertify(truckCertifyId, memId) {
			this.$router.push({name: 'viewtruckcertify', query: {truckCertifyId, memId}})
		},
	}
}
</script>
<style lang="stylus" scoped>
.table
	p
		margin 0
		padding 0
.download-btn
.exportExcel
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin-right 10px
	display inline-block
	vertical-align top
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>
