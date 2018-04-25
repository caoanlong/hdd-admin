<template>
	<div class="main-content">
		<div class="wf-card box-card">
			<div  class="header clearfix">承运单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字" >
						<el-input v-model="find.searchInfo" placeholder="承运单编号、发货编号、发货公司、收货公司" style="width:300px"></el-input>
					</el-form-item>
					<el-form-item label="创建时间">
						<el-date-picker
							v-model="findCreateTimeRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							@change="selectCreateTimeDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="发货时间">
						<el-date-picker
							v-model="findShipperRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							@change="selectShipperDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="到货时间">
						<el-date-picker
							v-model="findArriveRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							@change="selectArriveDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="订单状态">
						<el-select v-model="find.Status" placeholder="订单状态">
							<el-option value="" label="全部订单">全部订单</el-option>
							<el-option value="Committed" label="待执行">待执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="到达签收">到达签收</el-option>
							<el-option value="Closed" label="关闭">关闭</el-option>
							<el-option value="Canceled" label="作废">作废</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" >搜索</el-button>
						<el-button type="default" >重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="用户"  prop="userName" width="90" align="center"></el-table-column>
					<el-table-column label="承运单号" prop="carrierOrderNo" width="100" align="center">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top" class="customerTablePop">
								<p>发货单位：{{ scope.row.shipperCompanyvalue }}</p>
								<p>发货地：{{ scope.row.shipperArea }}</p>
								<p>收货单位：{{ scope.row.consigneeCompanyvalue }}</p>
								<p>卸货地：{{ scope.row.consigneeArea }}</p>
								<div slot="reference" class="name-wrapper">
									<span style="color:#409EFF">{{ scope.row.carrierOrderNo}}</span>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="处理状态"  prop="status" width="90" align="center"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyvalue"></el-table-column>
					<el-table-column label="卸货地" prop="consigneeArea"></el-table-column>
					<el-table-column label="收货人" prop="consigneevalue"></el-table-column>
					<el-table-column label="到货时间" prop="consigneeDate" width="120" align="center"></el-table-column>
					<el-table-column label="货物规格/货物名称">
						<template slot-scope="scope">
							<span>{{scope.row.name}}</span>
						</template>
					</el-table-column>
					<el-table-column label="货物总量" prop="CargoTotal"></el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyvalue"></el-table-column>
					<el-table-column label="发货时间" prop="shipperDate" width="120" align="center"></el-table-column>
					<el-table-column label="发货人" prop="shippervalue"></el-table-column>
					<el-table-column label="发货地" prop="shipperArea"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.carrierOrderID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList()">
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
							<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			find: {
				"searchInfo": '',
				"createTimeBegin": '',
				"createTimeEnd": '',
				"shipperBeginDate": '',
				"shipperEndDate": '',
			},
			findCreateTimeRangeDate: [],
			findShipperRangeDate: [],
			findArriveRangeDate: [],
			tableData: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		// 创建时间选择回调
		selectCreateTimeDateRange(date) {
			this.find.createTimeBegin = new Date(date[0]).getTime()
			this.find.createTimeEnd = new Date(date[1]).getTime()
		},
		// 发货时间选择回调
		selectShipperDateRange(date) {
			this.find.shipperBeginDate = new Date(date[0]).getTime()
			this.find.shipperEndDate = new Date(date[1]).getTime()
		},
		// 到货时间选择回调
		selectArriveDateRange(date) {
			// this.find.arriveBeginDate = new Date(date[0]).getTime()
			// this.find.arriveEndDate = new Date(date[1]).getTime()
		},
		// 重置搜索表单
		reset() {
			this.find.searchInfo = ''
			this.find.findCreateTimeRangeDate = []
			this.find.createTimeBegin = ''
			this.find.createTimeEnd = ''
			this.find.findShipperRangeDate = []
			this.find.shipperBeginDate = ''
			this.find.shipperEndDate = ''
			this.find.status = ''
			this.getList()
		},
		getList() {
			let params = {
				"current": this.pageIndex || 1,
				"size": this.pageSize,
				"searchInfo": this.find.searchInfo,
				"createTimeBegin": this.find.createTimeBegin,
				"createTimeEnd": this.find.createTimeEnd,
				"shipperBeginDate": this.find.shipperBeginDate,
				"shipperEndDate": this.find.shipperEndDate,
				"status": this.find.status,
			}
			requestJava({
				url: '/admin/bizCarrierOrder/list',
				params
			}).then(res => {
				this.count = res.data.data.total
				this.tableData = res.data.data.list
			}).catch(err => {})
		},
		view(carrierOrderID) {
			this.$router.push({ name: 'viewtmscarrierbill', query: {carrierOrderID} })
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
