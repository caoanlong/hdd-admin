<template>
	<div class="main-content">
		<div class="wf-card">
			<div class="header clearfix">调度单列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="调度单号">
						<el-input placeholder="调度单号" v-model="findDispatchOrderNo"></el-input>
					</el-form-item>
					<el-form-item label="发货地">
						<el-input placeholder="发货地" v-model="findShipperAddress"></el-input>
					</el-form-item>
					<el-form-item label="收货地">
						<el-input placeholder="收货地" v-model="findConsigneeAddress"></el-input>
					</el-form-item>
					<el-form-item label="司机/随车员姓名">
						<el-input placeholder="司机/随车员姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">搜索</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini" stripe>
					<el-table-column label="用户" prop="memberCompany" align="center"></el-table-column>
					<el-table-column label="调度单号" prop="dispatchOrderNo" width="180" align="center"></el-table-column>
					<el-table-column label="车辆号牌" prop="plateNo" width="110" align="center">
					</el-table-column>
					<el-table-column label="货物规格/名称">
						<template slot-scope="scope">
							<span v-if="scope.row.dispatchOrderCargo">
								{{(scope.row.dispatchOrderCargo.cargoType) ? scope.row.dispatchOrderCargo.cargoType+'/' : ''}}
								{{scope.row.dispatchOrderCargo.cargoName}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="配载量" width="180" align="center">
						<template slot-scope="scope">
							<span>
								{{scope.row.loadWeightSum ?( scope.row.loadWeightSum + '吨'): ''}}{{scope.row.loadVolumeSum?'/':''}}
								{{scope.row.loadVolumeSum ?(scope.row.loadVolumeSum+ '方') : '' }}{{scope.row.loadNumSum?'/':''}}
								{{scope.row.loadNumSum ? (scope.row.loadNumSum + '件'): ''}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="司机" prop="driverName" width="80" align="center">
					</el-table-column>
					<el-table-column label="调度状态" width="80" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 'Committed'">待执行</span>
							<span v-else-if="scope.row.status == 'Loaded'">已装运</span>
							<span v-else-if="scope.row.status == 'Signed'">已签收</span>
							<span v-else-if="scope.row.status == 'Canceled'">作废</span>
						</template>
					</el-table-column>
					<el-table-column label="随车人员" prop="superCargoName" width="80" align="center"></el-table-column>
					<el-table-column label="订单号" prop="carrierOrder.carrierOrderNo" width="180" align="center"></el-table-column>
					<el-table-column label="发货地" width="180" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.dispatchOrderCargo">
								{{scope.row.dispatchOrderCargo.shipperArea + scope.row.dispatchOrderCargo.shipperAreaDetail}}
							</span>
						</template>
					</el-table-column>
					<el-table-column label="收货地" width="180" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.dispatchOrderCargo">{{scope.row.dispatchOrderCargo.consigneeArea + scope.row.dispatchOrderCargo.consigneeAresDetail}}</span>
						</template>
					</el-table-column>
					<el-table-column label="到货时间" width="140" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.carrierOrder && scope.row.carrierOrder.consigneeDate">{{scope.row.carrierOrder.consigneeDate | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini"  icon="el-icon-view" @click="view(scope.row.dispatchOrderID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import requestJava, { javaUrl } from '../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			findDispatchOrderNo: '',
			findShipperAddress: '',
			findConsigneeAddress: '',
			findName: '',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			refreshing: false
		}
	},
	components: { Page },
	created() {
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
			this.findDispatchOrderNo = ''
			this.findShipperAddress = ''
			this.findConsigneeAddress = ''
			this.findName = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList(){
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				consigneeAddress: this.findConsigneeAddress,  //	收货地址
				dispatchOrderNo: this.findDispatchOrderNo,  //	调度单号
				name: this.findName,  //	司机或随车人员姓名
				shipperAddress: this.findShipperAddress,  //发货地址
			}
			requestJava({
				url: '/admin/bizDispatchOrder/list',
				params
			}).then(res => {
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
		},
		view(dispatchOrderID) {
			this.$router.push({ name: 'viewtmsdispatchbill' , query: { dispatchOrderID} })
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
