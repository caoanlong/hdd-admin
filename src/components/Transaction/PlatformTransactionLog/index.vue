<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>会员交易流水</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="form-inline"  size="small">
					<el-form-item label="支付订单ID">
						<el-input placeholder="请输入..." v-model="findPayOrderID"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList(1)">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="平台账户" prop="accountID"></el-table-column>
					<el-table-column label="支付订单ID" prop="payOrderID"></el-table-column>
					<el-table-column label="收支类型" prop="type" width="100"></el-table-column>
					<el-table-column label="交易前余额" align="center" prop="beforeBalance" width="100"></el-table-column>
					<el-table-column label="金额" align="center" prop="amount" width="100"></el-table-column>
					<el-table-column label="余额" align="center" prop="afterBalance" width="100"></el-table-column>
					<el-table-column label="付款人ID" prop="payerID"></el-table-column>
					<el-table-column label="付款人是否平台" align="center" width="110">
						<template slot-scope="scope">
							<span>{{scope.row.payerIsSys == 'Y' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="收款人ID" prop="payeeID"></el-table-column>
					<el-table-column label="收款人是否平台" align="center" width="110">
						<template slot-scope="scope">
							<span>{{scope.row.payeeIsSys == 'Y' ? '是' : '否'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="支付方式" prop="payType" width="100"></el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList()">
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
	</div>
</template>
<script type="text/javascript">
	import requestJava from '../../../common/requestJava'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				findPayOrderID: '',
				pageNum: 1,
				pageSize: 10,
				count: 0,
				tableData: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			pageChange(index) {
				this.getList(index)
			},
			reset() {
				this.findPayOrderID = '',
				this.getList()
			},
			getList(pageNum) {
				let params = {
					pageNum: pageNum || 1,
					pageSize: this.pageSize,
					payOrderID: this.findPayOrderID
				}
				requestJava({
					url: '/accountBill/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 200) {
						this.count = res.data.data.total
						this.tableData = res.data.data.list
					} else {
						Message.error(res.data.message)
					}
				})
			},
		}
	}
</script>
<style lang="stylus" scoped>
</style>