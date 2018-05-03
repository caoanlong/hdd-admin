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
						<el-select v-model="find.status" placeholder="订单状态">
							<el-option value="" label="全部订单">全部订单</el-option>
							<el-option value="Committed" label="待执行">待执行</el-option>
							<el-option value="Running" label="执行中">执行中</el-option>
							<el-option value="Signed" label="到达签收">到达签收</el-option>
							<el-option value="Closed" label="关闭">关闭</el-option>
							<el-option value="Canceled" label="作废">作废</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="用户"  prop="memberCompany" width="90" align="center"></el-table-column>
					<el-table-column label="承运单号" prop="carrierOrderNo" width="160">
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
					<el-table-column label="处理状态" width="90">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 'Committed'">待执行</span>
							<span v-else-if="scope.row.status == 'Running'">执行中</span>
							<span v-else-if="scope.row.status == 'Signed'">到达签收</span>
							<span v-else-if="scope.row.status == 'Closed'">关闭</span>
							<span v-else-if="scope.row.status == 'Canceled'">作废</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="卸货地" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.consigneeArea}}{{scope.row.consigneeDetailAddress}}</span>
						</template>
					</el-table-column>
					<el-table-column label="收货人" prop="consigneeName"></el-table-column>
					<el-table-column label="到货时间" width="140" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.consigneeDate | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="货物规格/货物名称">
						<template slot-scope="scope">
							<span v-if="scope.row.carrierCargo[0]">
								{{scope.row.carrierCargo[0].cargoType}}
								/{{scope.row.carrierCargo[0].cargoName}}
								<span v-if="scope.row.carrierCargo.length > 1">...</span>
							</span>
						</template>
					</el-table-column>
					<el-table-column label="货物总量">
						<template slot-scope="scope" >
							<span v-if="scope.row.carrierCargo[0]">
								  {{ SumDispatchCargoQuantity(scope.row.carrierCargo) }} 
							</span>
						</template>
					</el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="发货时间" width="140" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.shipperDate | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="发货人" prop="shipperName"></el-table-column>
					<el-table-column label="发货地" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.shipperArea}}{{scope.row.shipperDetailAddress}}</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="140" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
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
				"consigneeBeginDate": '',
				"consigneeEndDate": '',
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
		SumDispatchCargoQuantity(data) {
			let sumWeight = 0;
			let sumVolume = 0;
			let sumNum = 0;
			data.map(item => {
				sumWeight += (item.cargoWeight ?item.cargoWeight : 0)
				sumVolume += (item.cargoVolume ? item.cargoVolume : 0)
				sumNum += (item.cargoNum ? item.cargoNum : 0)
			})
			return (sumWeight + '吨/' + sumVolume + '方/' + sumNum + '件')
		},
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
			this.find.consigneeBeginDate = new Date(date[0]).getTime()
			this.find.consigneeEndDate = new Date(date[1]).getTime()
		},
		// 重置搜索表单
		reset() {
			this.find.searchInfo = ''
			this.findCreateTimeRangeDate = []
			this.find.createTimeBegin = ''
			this.find.createTimeEnd = ''
			this.findShipperRangeDate = []
			this.find.shipperBeginDate = ''
			this.find.shipperEndDate = ''
			this.findArriveRangeDate = []
			this.find.consigneeBeginDate = ''
			this.find.consigneeEndDate = ''
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
				"consigneeBeginDate": this.find.consigneeBeginDate,
				"consigneeEndDate": this.find.consigneeEndDate,
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
