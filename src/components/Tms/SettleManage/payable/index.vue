<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">应付列表</div>
			<el-tabs v-model="tabSelected" type="card" @tab-click="handleTabSelected">
				<el-tab-pane label="司机" name="driver"></el-tab-pane>
				<el-tab-pane label="随车人员" name="superCargo"></el-tab-pane>
			</el-tabs>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="司机" v-if="tabSelected=='driver'">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="随车人员" v-if="tabSelected=='superCargo'">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="车辆编号">
						<el-input placeholder="请输入..." v-model="findcode"></el-input>
					</el-form-item>
					<el-form-item label="车牌号码">
						<el-input placeholder="请输入..." v-model="findplateNo"></el-input>
					</el-form-item>
					<el-form-item label="发货单位">
						<el-input placeholder="请输入..." v-model="findshipperCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="收货单位">
						<el-input placeholder="请输入..." v-model="findconsigneeCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="发货日期">
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
						<el-button type="primary" @click="getDetail">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table 
				ref="recTable" 
				:data="tableData" 
				show-summary 
				:summary-method="getSummaries" 
				border style="width: 100%" 
				size="mini" stripe>
					<el-table-column label="序号" type="index" align="center" width="60" fixed></el-table-column>
					<el-table-column label="用户" align="center" prop="memberCompany"></el-table-column>
					<el-table-column label="发货日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.shipperDate">{{scope.row.shipperDate  | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="发货单号" align="center">
						<template slot-scope="scope">
							{{scope.row.shipperNo?(scope.row.shipperNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="调度单号" align="center">
						<template slot-scope="scope">
							{{scope.row.dispatchOrderNo?(scope.row.dispatchOrderNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="承运单号" align="center">
						<template slot-scope="scope">
							{{scope.row.carrierOrderNo?(scope.row.carrierOrderNo +''):''}}
						</template>
					</el-table-column>
					<el-table-column label="发货单位" prop="shipperCompanyName"></el-table-column>
					<el-table-column label="收货单位" prop="consigneeCompanyName"></el-table-column>
					<el-table-column label="派单日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">
								{{scope.row.createTime  | getdatefromtimestamp()}}
							</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="签收日期" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.signTime">
							{{scope.row.signTime | getdatefromtimestamp()}}</span>
							<span v-else></span>
						</template>
					</el-table-column>
					<el-table-column label="车辆编号" prop="code"></el-table-column>
					<el-table-column label="车牌号码" prop="plateNo" align="center" width="90"></el-table-column>
					<el-table-column label="司机姓名" prop="realName" align="center" v-if="tabSelected=='driver'"></el-table-column>
					<el-table-column label="随车人员" prop="realName" align="center" v-if="tabSelected=='superCargo'"></el-table-column>
					<el-table-column label="收货地区" prop="consigneeArea"></el-table-column>
					<el-table-column label="收货详细地址" prop="consigneeDetailAddress"></el-table-column>
					<el-table-column label="运费" prop="freight" align="center"></el-table-column>
					<el-table-column label="绕路里程" align="center">
						<template slot-scope="scope">
							{{scope.row.detoursMileage?(scope.row.detoursMileage +''):'0'}}
						</template>
					</el-table-column>
					<el-table-column label="绕路费用" prop="detoursAmount" align="center">
					</el-table-column>
					<el-table-column label="其他" prop="otherAmount" align="center">
					</el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="总计" prop="allMoney" align="center" width="120"></el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{total}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getDetail">
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
import { Message } from 'element-ui'
import requestJava, { javaUrl } from '../../../../common/requestJava'
export default {
	data() {
		return {
			tabSelected:'driver',
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			tableData: [],
			findRangeDate: [],
			findshipperBeginDate: '',
			findshipperEndDate: '',
			findplateNo: '',
			findName: '',
			findshipperCompanyName: '',
			findconsigneeCompanyName: '',
			findcode: ''
		}
	},
	created() {
		this.getDetail()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getDetail()
		},
		selectDateRange(date) {
			this.findshipperBeginDate = new Date(date[0]).getTime()
			this.findshipperEndDate = new Date(date[1]).getTime()
		},
		reset() {
			this.findRangeDate = [],
			this.findshipperBeginDate = '',
			this.findshipperEndDate = '',
			this.findplateNo = '',
			this.findName = '',
			this.findshipperCompanyName = '',
			this.findconsigneeCompanyName = '',
			this.findcode = '',
			this.getDetail()
		},
		getDetail() {
			let params = {
				current: this.pageIndex,
				size: this.pageSize,
				name: this.findDriver,
				type: this.tabSelected,
				shipperBeginDate: this.findshipperBeginDate,
				shipperEndDate: this.findshipperEndDate,
				plateNo: this.findplateNo,
				name: this.findName,
				shipperCompanyName: this.findshipperCompanyName,
				consigneeCompanyName: this.findconsigneeCompanyName,
				code: this.findcode
			}
			requestJava({
				url: '/finance/payableDetail',
				params
			}).then(res => {
				this.tableData = res.data.data.list
				this.total = res.data.data.total			
			})
		},
		handleTabSelected(tab) {
			this.tabSelected = tab.$options.propsData.name
			console.log(this.tabSelected)
			this.reset()
		}
	}
}

</script>
<style lang="stylus" scoped>


</style>
