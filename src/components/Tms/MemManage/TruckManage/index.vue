<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>车辆列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="时间">
						<el-date-picker
							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="车牌号">
						<el-input placeholder="请输入..." v-model="findPlateNo"></el-input>
					</el-form-item>
					<el-form-item label="车辆编号">
						<el-input placeholder="请输入..." v-model="findCode"></el-input>
					</el-form-item>
					<el-form-item label="牵引质量">
						<el-input placeholder="请输入..." v-model="findTractiveTonnage"></el-input>
					</el-form-item>
					<el-form-item label="车长">
						<el-input placeholder="请输入..." v-model="findLength"></el-input>
					</el-form-item>
					<el-form-item label="车宽">
						<el-input placeholder="请输入..." v-model="findWidth"></el-input>
					</el-form-item>
					<el-form-item label="车高">
						<el-input placeholder="请输入..." v-model="findHigh"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
					<el-table-column label="用户" prop="memberCompany" width="100px"></el-table-column>
					<el-table-column label="创建时间" width="140px">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="所属地区" prop="area"></el-table-column>
					<el-table-column label="所属企业" prop="companyName" width="100px"></el-table-column>
					<el-table-column label="自编号" prop="code"></el-table-column>
					<el-table-column label="车牌号" prop="plateNo"></el-table-column>
					<el-table-column label="车牌颜色" prop="plateNoColor"></el-table-column>
					<el-table-column label="车辆类别" prop="truckCategory"></el-table-column>
					<el-table-column label="车辆类型" prop="truckType"></el-table-column>
					<el-table-column label="道路运输证号" prop="roadTransportNo"></el-table-column>
					<el-table-column label="经营范围" prop="businessScope"></el-table-column>
					<el-table-column label="道路运输证年审期至">
						<template slot-scope="scope">
							<span v-if="scope.row.roadTransportLicAnnualPeriod">{{scope.row.roadTransportLicAnnualPeriod | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="行驶证审验效期至">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicExamineExpires">{{scope.row.driverLicExamineExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="承运人责任险有效期至">
						<template slot-scope="scope">
							<span v-if="scope.row.carrierRiskInsuranceExpires">{{scope.row.carrierRiskInsuranceExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="等级评定" prop="rank"></el-table-column>
					<el-table-column label="下次等评日期">
						<template slot-scope="scope">
							<span v-if="scope.row.nextRankEvaluteTime">{{scope.row.nextRankEvaluteTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="二级维护日期">
						<template slot-scope="scope">
							<span v-if="scope.row.secondaMaintainTime">{{scope.row.secondaMaintainTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="下次二级维护日期">
						<template slot-scope="scope">
							<span v-if="scope.row.nextSecondLevel">{{scope.row.nextSecondLevel | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="载重" prop="loads"></el-table-column>
					<el-table-column label="罐体类型" prop="cannedType"></el-table-column>
					<el-table-column label="罐体容积" prop="tankVolume"></el-table-column>
					<el-table-column label="罐体检测有效期至">
						<template slot-scope="scope">
							<span v-if="scope.row.tankQCExpires">{{scope.row.tankQCExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="安全阀检测有效期至">
						<template slot-scope="scope">
							<span v-if="scope.row.safetyValvesQCExpires">{{scope.row.safetyValvesQCExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="压力表检测有效期至">
						<template slot-scope="scope">
							<span v-if="scope.row.pressureGaugeQCExpires">{{scope.row.pressureGaugeQCExpires | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="挂车车牌" prop="trailerPlateNo"></el-table-column>
					<el-table-column label="汽车生产厂家" prop="manufacturer"></el-table-column>
					<el-table-column label="品牌型号" prop="carBrandModel"></el-table-column>
					<el-table-column label="发动机号" prop="engineNO"></el-table-column>
					<el-table-column label="车架号" prop="vehicleFrameNO"></el-table-column>
					<el-table-column label="行驶证注册日期">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicRegisterTime">{{scope.row.driverLicRegisterTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="行驶证发证日期">
						<template slot-scope="scope">
							<span v-if="scope.row.driverLicIssueTime">{{scope.row.driverLicIssueTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="牵引质量" prop="tractiveTonnage"></el-table-column>
					<el-table-column label="车长" prop="length"></el-table-column>
					<el-table-column label="车宽" prop="width"></el-table-column>
					<el-table-column label="车高" prop="high"></el-table-column>
					<el-table-column label="操作" width="100" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.truckID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			findRangeDate: [],
			findPlateNo: '',
			findCode: '',
			findTractiveTonnage: '',
			findLength: '',
			findWidth: '',
			findHigh: '',
			findCreateTimeBegin: '',
			findCreateTimeEnd: '',
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.findCreateTimeBegin = new Date(date[0]).getTime()
			this.findCreateTimeEnd = new Date(date[1]).getTime()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findRangeDate = []
			this.findPlateNo = ''
			this.findCode = ''
			this.findTractiveTonnage = ''
			this.findLength = ''
			this.findWidth = ''
			this.findHigh = ''
			this.findCreateTimeBegin = ''
			this.findCreateTimeEnd = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				"current": this.pageIndex,
				"size": this.pageSize,
				"plateNo": this.findPlateNo,
				"code": this.findCode,
				"tractiveTonnage": this.findTractiveTonnage,
				"length": this.findLength,
				"width": this.findWidth,
				"high": this.findHigh,
				"createTimeBegin": this.findCreateTimeBegin,
				"createTimeEnd": this.findCreateTimeEnd
			}
			requestJava({
				url: '/truck/findList',
				params
			}).then(res => {
				this.count = res.data.data.total
				this.tableData = res.data.data.list
			}).catch(err => {})
		},
		view(truckID) {
			this.$router.push({ name: 'viewtmstruck', query: {truckID} })
		}
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.table-img
	width 30px
	cursor pointer
</style>
