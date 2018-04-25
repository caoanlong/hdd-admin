<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>收发货单位列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="录入时间">
						<el-date-picker
							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="公司名称">
						<el-input placeholder="请输入..." v-model="findCompanyName"></el-input>
					</el-form-item>
					<el-form-item label="地址">
						<el-input placeholder="请输入..." v-model="findCompanyArea"></el-input>
					</el-form-item>
					<el-form-item label="联系人">
						<el-input placeholder="请输入..." v-model="findContactName"></el-input>
					</el-form-item>
					<el-form-item label="联系方式">
						<el-input placeholder="请输入..." v-model="findContactPhone"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
					<el-table-column label="用户" prop="userName"></el-table-column>
					<el-table-column label="公司名称" prop="companyName"></el-table-column>
					<el-table-column label="地址">
						<template slot-scope="scope">
							<span>{{scope.row.companyArea}}{{scope.row.detailAddress}}</span>
						</template>
					</el-table-column>
					<el-table-column label="联系人" prop="contactName"></el-table-column>
					<el-table-column label="联系方式" prop="contactPhone"></el-table-column>
					<el-table-column label="录入时间">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>					
					<el-table-column label="操作" width="100" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.customerID)">查看</el-button>
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
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			findRangeDate: [],
			findCompanyArea: '',
			findCompanyName: '',
			findContactName: '',
			findContactPhone: '',
			findCreateTimeBegin: '',
			findCreateTimeEnd: '',
			findDetailAddress: ''
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
		selectDateRange(date) {
			this.findCreateTimeBegin = new Date(date[0]).getTime()
			this.findCreateTimeEnd = new Date(date[1]).getTime()
		},
		// 重置搜索表单
		reset() {
			this.findCode = ''
			this.findName = ''
			this.getList()
		},
		getList() {
			let params = {
				"current": this.pageIndex,
				"size": this.pageSize,
				"type": "ShipperConsignee",
				"companyArea": this.findCompanyArea,
				"companyName": this.findCompanyName,
				"contactName": this.findContactName,
				"contactPhone": this.findContactPhone,
				"createTimeBegin": this.findCreateTimeBegin,
				"createTimeEnd": this.findCreateTimeEnd,
				"detailAddress": this.findDetailAddress
			}
			requestJava({
				url: '/customer/findList',
				params
			}).then(res => {
				this.count = res.data.data.total
				this.tableData = res.data.data.list
			}).catch(err => {})
		},
		view(customerID) {
			this.$router.push({ name: 'viewtmsrecdeliverycomp', query: { customerID }})
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
