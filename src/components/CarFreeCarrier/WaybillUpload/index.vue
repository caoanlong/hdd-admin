<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人运单列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="托运单号：">
						<el-input placeholder="托运单号"></el-input>
					</el-form-item>
					<el-form-item label="承运人：">
						<el-input placeholder="承运人"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addWaybill">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="托运单号" prop="shippingNoteNumber">
					</el-table-column>
					<el-table-column label="承运人" align="center" prop="carrier">
					</el-table-column>
					<el-table-column label="托运时间" prop="dteOfShipment" align="center">
					</el-table-column>
					<el-table-column label="实际发运时间" width="140" prop="dateActualShipment" align="center">
					</el-table-column>
					<el-table-column label="收货时间" prop="dateOfDelivery" align="center">
					</el-table-column>
					<el-table-column label="发货人" prop="consignor" align="center">
					</el-table-column>
					<el-table-column label="装货地点" prop="loadingPlace">
					</el-table-column>
					<el-table-column label="收货人" prop="consignee" align="center">
					</el-table-column>
					<el-table-column label="状态" prop="hasFail">
					</el-table-column>
					<el-table-column label="错误描述" prop="failDescription">
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
								<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
								<el-button type="default" size="mini" icon="el-icon-edit">编辑</el-button>
								<el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getWaybillList()">
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
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: []
		}
	},
	created() {
		this.getWaybillList()
	},
	methods: {
		getWaybillList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize
			}
			requestJava({
				url: '/notruckWaybill/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
					console.log(res.data)
				} else {
					Message.error(res.data.message)
				}
			})
		},
		pageChange(index) {
			this.getWaybillList(index)
		},
		addWaybill() {
			this.$router.push({ name: 'addwaybill' })
		},
		editWaybill(id) {
			this.$router.push({ name: 'editwaybill'})
		},
		viewWaybill(id) {
			this.$router.push({ name: 'viewwaybill'})
		}
	}
}

</script>
<style lang="stylus" scoped>
</style>