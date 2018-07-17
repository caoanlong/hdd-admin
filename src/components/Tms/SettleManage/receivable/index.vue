<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">应收列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="mini">
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findshipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findconsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-date-picker 
							v-model="findRangeDate" 
							type="daterange" 
							range-separator="至" 
							start-placeholder="开始日期" 
							end-placeholder="结束日期" 
							:clearable="false" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table ref="recTable" :data="tableData" show-summary :summary-method="getSummaries" border style="width: 100%" size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" fixed width="60"></el-table-column>
					<el-table-column label="用户" prop="memberCompany"></el-table-column>
					<el-table-column label="发货日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.shipperDate">
							{{scope.row.shipperDate | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="发货单号" prop="shipperNo"></el-table-column>
					<el-table-column label="承运单号" prop="carrierOrderNo"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="派单日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.createTime">
							{{scope.row.createTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="调度单号" prop="dispatchOrderNo"></el-table-column>
					<el-table-column label="签收日期" width="90" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.signTime">{{scope.row.signTime | getdatefromtimestamp(true)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo"></el-table-column>
					<el-table-column label="驾驶员" prop="realName"></el-table-column>
					<el-table-column label="收货地区" prop="consigneeArea" width="120"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<el-table-column label="应收款" prop="receivables"></el-table-column>
					<el-table-column label="签收货量">
						<template slot-scope="scope">
							{{scope.row.cargoNum ?scope.row.cargoNum +'件':''}}{{scope.row.cargoNum ?'/':''}}{{scope.row.cargoVolume ?scope.row.cargoVolume +'方':''}}{{scope.row.cargoVolume ?'/':''}}{{scope.row.cargoWeight?scope.row.cargoWeight+'吨':''}}
						</template>	
					</el-table-column>
					<el-table-column label="其他金额" prop="otherAmount"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="allmoney" align="center" width="120"></el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava, { javaUrl } from '../../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			// findRangeDate: [new Date().getTime() - 3600000 * 24 * 30, new Date().getTime()],
			// findshipperBeginDate: new Date().getTime() - 3600000 * 24 * 30,
			// findshipperEndDate: new Date().getTime(),
			findRangeDate: [],
			findshipperBeginDate:'',
			findshipperEndDate:'',
			findshipperCompanyName:'',
			findconsigneeCompanyName:'',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.findshipperBeginDate = new Date(date[0]).getTime()
			this.findshipperEndDate = new Date(date[1]).getTime()
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
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.findshipperCompanyName = ''
			this.findconsigneeCompanyName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				shipperCompanyName:this.findshipperCompanyName,
				consigneeCompanyName:this.findconsigneeCompanyName
			}
			requestJava({
				url: '/finance/receivableDetail',
				params
			}).then(res => {
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
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
