<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>应收列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="mini">
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
					<el-table-column label="发货日期" width="90" align="center">
						<template slot-scope="scope" v-if="scope.row.shipperDate">
							{{scope.row.shipperDate | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="发货单号" prop="consigneNum"></el-table-column>
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
						<template slot-scope="scope" v-if="scope.row.signTime">
							{{scope.row.signTime | getdatefromtimestamp(true)}}
						</template>
					</el-table-column>
					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo"></el-table-column>
					<el-table-column label="驾驶员" prop="realName"></el-table-column>
					<el-table-column label="核载吨位" prop="loads"></el-table-column>
					<el-table-column label="收货地区" prop="consigneeArea" width="120"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<el-table-column label="对外里程" prop="externalMile"></el-table-column>
					<el-table-column label="对外单价" prop="externalUnitPrice"></el-table-column>
					<el-table-column label="签收货量" prop="receiveNum"></el-table-column>
					<el-table-column label="外部运费" prop="externalFreight"></el-table-column>
					<el-table-column label="其他" prop="other"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="totalNum" align="center" width="120"></el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList">
							<el-option label="10" :value="10"></el-option>
							<el-option label="20" :value="20"></el-option>
							<el-option label="30" :value="30"></el-option>
							<el-option label="40" :value="40"></el-option>
							<el-option label="50" :value="50"></el-option>
							<el-option label="100" :value="100"></el-option>
						</el-select>
						<span>条记录</span>
					</el-col>
					<el-col :span="12">
						<div class="pagination">
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava, { javaUrl } from '../../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			// findRangeDate: [new Date().getTime() - 3600000 * 24 * 30, new Date().getTime()],
			// findshipperBeginDate: new Date().getTime() - 3600000 * 24 * 30,
			// findshipperEndDate: new Date().getTime(),

			findRangeDate: [],
			findshipperBeginDate:'',
			findshipperEndDate:'',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange() {
			this.pageIndex = index
			this.getList()
		},
		selectDateRange(date) {
			this.findshipperBeginDate = new Date(date[0]).getTime()
			this.findshipperEndDate = new Date(date[1]).getTime()
		},
		reset() {
			this.findRangeDate = []
			this.findshipperBeginDate = ''
			this.findshipperEndDate = ''
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate
			}
			requestJava({
				url: '/finance/payableDetail',
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
