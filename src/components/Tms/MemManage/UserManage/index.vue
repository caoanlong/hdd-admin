<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="关键字">
						<el-input style="width: 300px" placeholder="手机号、用户名、公司名、联系人" v-model="find.keyword"></el-input>
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
						<el-button type="primary" @click="search">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
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
					<el-table-column label="操作" width="100" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.applyRecordID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import Company from '../../../../api/Company'
import { baseMixin } from "../../../../common/mixin"
import { PAGEINDEX, PAGESIZE } from '../../../../common/const'
export default {
	mixins: [baseMixin],
	data() {
		return {
			findRangeDate: [],
			find: {
				startDate: '',
				endDate: '',
				keyword: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.findStartDate = new Date(date[0]).getTime()
			this.findEndDate = new Date(date[1]).getTime()
		},
		reset() {
			this.findRangeDate = []
			this.find.startDate = ''
			this.find.endDate = ''
			this.find.keyword = ''
			this.pageIndex = PAGEINDEX
			this.pageSize = PAGESIZE
			this.getList()
		},
		getList() {
			Company.apply().find({
				current: this.pageIndex,
				size: this.pageSize,
				keyword: this.findKeyword,
				applyTimeBegin: this.findStartDate,
				applyTimeEnd: this.findEndDate
			}).then(res => {
				this.total = res.total
				this.tableData = res.records
			})
		},
		view(applyRecordID) {
			this.$router.push({ name: 'tmsviewusermanage', query: {applyRecordID} })
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
