<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人货源列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="报文参考号：">
						<el-input placeholder="报文参考号" v-model="findMessageReferenceNumber"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click.native="getCargoList(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="AddCargo">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
				<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="报文参考号" prop="messageReferenceNumber" align="center" width="140">
					</el-table-column>
					<el-table-column label="发送时间"prop="messageSendingDateTime" align="center" width="120">
					</el-table-column>
					<el-table-column label="发货人" prop="consignor">
					</el-table-column>
					<el-table-column label="出发地" prop="placeOfLoading">
					</el-table-column>
					<el-table-column label="费用总金额" prop="totalMonetaryAmount">
					</el-table-column>
					<el-table-column label="车辆分类" prop="vehicleClassificationCode">
					</el-table-column>
					<el-table-column label="货物名称" prop="descriptionOfGoods">
					</el-table-column>
					<el-table-column label="货物毛重" prop="goodsItemGrossWeight">
					</el-table-column>
					<el-table-column label="状态" prop="hasFail">
					</el-table-column>
					<el-table-column label="失败描述" prop="failDescription">
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime"  align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="ViewCargo(scope.row.goodsId)">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" @click="EditCargo(scope.row.goodsId)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getCargoList()">
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
			tableData: [],
			refreshing: false,
			findMessageReferenceNumber:''
		}
	},
	created() {
		this.getCargoList()
	},
	methods: {
		reset() {
			this.findMessageReferenceNumber = ''
		},
		getCargoList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize,
				messageReferenceNumber: this.findMessageReferenceNumber
			}
			requestJava({
				url: '/notruckCargosource/list',
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
			this.getCargoList(index)
		},
		AddCargo() {
			this.$router.push({ name: 'addcargo' })
		},
		EditCargo(goodsId) {
			this.$router.push({ name: 'editcargo', query: { goodsId} })
		},
		ViewCargo(goodsId) {
			this.$router.push({ name: 'viewcargo' , query: { goodsId} })
		},
		refresh() {
			this.refreshing = true
			this.getCargoList()
			setTimeout(() => {
				this.refreshing = false
			}, 500)
		}
	}
}

</script>
<style lang="stylus" scoped>


</style>
