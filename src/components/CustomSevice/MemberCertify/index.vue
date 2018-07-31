<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>会员列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="会员类型">
						<el-select placeholder="请选择" v-model="findMemberType">
							<el-option v-for="memberType in memberTypes" :key="memberType.Dict_ID" :label="memberType.NAME" :value="memberType.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="关键字">
						<el-input placeholder="请输入..." v-model="findKeywords"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findMemberStatus">
							<el-option label="启用" value="N"></el-option>
							<el-option label="封停" value="Y"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="认证状态">
						<el-select placeholder="请选择" v-model="findCertifyStatus">
							<el-option v-for="cerStatus in certifyStatus" :key="cerStatus.VALUE" :label="cerStatus.NAME" :value="cerStatus.VALUE"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="钱包状态">
						<el-select placeholder="请选择" v-model="findWalletStatus">
							<el-option label="已激活" value="Y"></el-option>
							<el-option label="未激活" value="N"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="实名状态">
						<el-select placeholder="请选择" v-model="findRealNameStatus">
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
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<a :href="exportExcelUrl" download="goodssource.xlsx" class="exportExcel el-icon-download">导出</a>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
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
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import requestJava , { javaUrl } from '../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			findMemberType: '',
			findKeywords: '',
			findMemberStatus: '',
			findCertifyStatus: '',
			findRealNameStatus: '',
			findWalletStatus: '',
			findDataRange: [],
			startDate: '',
			endDate: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			memberTypes: [],
			certifyStatus: [],
			realNameStatus: [],
			selectedMembers: [],
			exportExcelUrl:'',
		}
	},
	components: { Page },
	created() {
		this.getMemberTypes()
		this.getCertifyStatus()
		this.getRealNameStatus()
		this.resetExportExcelUrl()
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findMemberType = ''
			this.findKeywords = ''
			this.findMemberStatus = ''
			this.findCertifyStatus = ''
			this.findRealNameStatus = ''
			this.findWalletStatus = ''
			this.findDataRange = ''
			this.startDate = ''
			this.endDate = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.resetExportExcelUrl()
			this.getList()
		},
		selectionChange(data) {
			this.selectedMembers = data.map(item => item.memId)
		},
		getMemberTypes() {
			let params = {
				TYPE: 'memberType',
			}
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
			let params = {
				TYPE: 'CertifyStatus',
			}
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
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		selectDateRange(date) {
			this.startDate = new Date(date[0]).getTime()
			this.endDate = new Date(date[1]).getTime()
			this.resetExportExcelUrl()
		},
		resetExportExcelUrl() {
			this.exportExcelUrl = javaUrl + '/mem/memMember/export?Authorization=' + localStorage.getItem("token") 
				+ '&createBeginDate=' + this.startDate 
				+ '&createEndDate=' + this.endDate
		},
		getList() {
			let params = {
				pageNum: this.pageIndex || 1,
				pageSize: this.pageSize,
				type: this.findMemberType,
				keyword: this.findKeywords,
				status: this.findMemberStatus,
				certifyStatus: this.findCertifyStatus,
				realNameStatus: this.findRealNameStatus,
				walletStatus: this.findWalletStatus,
				createBeginDate: this.startDate,
				createEndDate: this.endDate
			}
			requestJava({
				url: '/mem/memMember/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.message || res.data.msg)
				}
			})
		},
		updateStatus(memId, status) {
			let data = {
				memId,
				status
			}
			requestJava({
				url: '/mem/memMember/updateStatus',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 200) {
					Message.success(res.data.message)
					this.getList()
				} else {
					Message.error(res.data.message || res.data.msg)
				}
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
