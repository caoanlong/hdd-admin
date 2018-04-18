<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="关键字">
						<el-input style="width: 300px" placeholder="手机号、用户名、公司名、联系人" v-model="findKeyword"></el-input>
					</el-form-item>
					<el-form-item label="申请时间">
						<el-date-picker
							v-model="findRangeDate"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
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
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="用户ID" prop="memberID" width="150"></el-table-column>
					<el-table-column label="用户名" prop="userName"></el-table-column>
					<el-table-column label="联系人" prop="contact"></el-table-column>
					<el-table-column label="公司名称" prop="companyName"></el-table-column>
					<el-table-column label="公司地址" prop="companyArea"></el-table-column>
					<el-table-column label="申请状态">
						<template slot-scope="scope">
							<span v-if="scope.row.auditStatus == 'Draft'">草稿</span>
							<span v-else-if="scope.row.auditStatus == 'Pending'">待审核</span>
							<span v-else-if="scope.row.auditStatus == 'Passed'">已开通</span>
							<span v-else-if="scope.row.auditStatus == 'Rejected'">已拒绝</span>
						</template>
					</el-table-column>
					<el-table-column label="申请时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.applyTime">{{scope.row.applyTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="通过时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewUserManage(scope.row.applyRecordID)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
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
			findRangeDate: [],
			findStartDate: '',
			findEndDate: '',
			findKeyword: '',
			tableData: [],
			selectedList: [],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			console.log(date)
			this.findStartDate = new Date(date[0]).getTime()
			this.findEndDate = new Date(date[1]).getTime()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		// 重置搜索表单
		reset() {
			this.findRangeDate = []
			this.findStartDate = ''
			this.findEndDate = ''
			this.findKeyword = ''
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex || 1,
				size: this.pageSize,
				keyword: this.findKeyword,
				applyTimeBegin: this.findStartDate,
				applyTimeEnd: this.findEndDate
			}
			requestJava({
				url: '/admin/applyrecord/getList',
				method: 'get',
				params
			}).then(res => {
				console.log(res.data.data)
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		viewUserManage(applyRecordID) {
			this.$router.push({ name: 'tmsviewusermanage', query: {applyRecordID} })
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.applyRecordID)
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
