<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>会员交易流水</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="form-inline"  size="small">
					<el-form-item label="收支类型">
						<el-select placeholder="请选择" v-model="findType">
							<el-option label="Receive" value="Receive"></el-option>
							<el-option label="Pay" value="Pay"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="钱包ID" prop="walletID"></el-table-column>
					<el-table-column label="收支类型" prop="type" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.type">{{scope.row.type == 'Receive' ? '收入' : '支出'}}</span>
						</template>
					</el-table-column>
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
							<span v-if="scope.row.createTime">{{scope.row.createTime}}</span>
						</template>
					</el-table-column>
					<el-table-column label="费用流水类型" prop="billType" width="110"></el-table-column>
					<el-table-column label="订单ID" prop="orderID"></el-table-column>
					<el-table-column label="流水描述" prop="remark"></el-table-column>
					<el-table-column label="对方姓名" prop="oppositeName" width="100" align="center"></el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
export default {
	data() {
		return {
			findType: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: []
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
			this.findType = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				type: this.findType
			}
			requestJava({
				url: '/walletBill/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.msg)
				}
			})
		},
	}
}
</script>
<style lang="stylus" scoped>

</style>