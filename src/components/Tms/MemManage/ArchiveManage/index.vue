<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>档案列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="建档时间">
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
					<el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
					<el-table-column label="用户" prop="memberCompany"></el-table-column>
					<el-table-column label="车牌号" prop="plateNo"></el-table-column>
					<el-table-column label="自编号" prop="code"></el-table-column>
					<el-table-column label="道路运输证号" prop="transportLicenceCode"></el-table-column>
					<el-table-column label="姓名" prop="realName"></el-table-column>
					<el-table-column label="身份证号" prop="idCardNum"></el-table-column>
					<el-table-column label="从业资格证号" prop="qualificationCode"></el-table-column>
					<el-table-column label="联系电话" prop="mobile"></el-table-column>
					<el-table-column label="载重" prop="loads"></el-table-column>
					<el-table-column label="备注" prop="remark"></el-table-column>
					<el-table-column label="创建时间">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="建档时间">
						<template slot-scope="scope">
							<span v-if="scope.row.archiveTime">{{scope.row.archiveTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.transportRecordID)">查看</el-button>
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
			selectedList: [],
			findRangeDate: [],
			findBeginTime: '',
			findEndTime: '',
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
			this.findBeginTime = new Date(date[0]).getTime()
			this.findEndTime = new Date(date[1]).getTime()
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.transportRecordID)
		},
		// 重置搜索表单
		reset() {
			this.findRangeDate = []
			this.findBeginTime = ''
			this.findEndTime = ''
			this.getList()
		},
		getList() {
			let params = {
				"current": this.pageIndex || 1,
				"size": this.pageSize,
				"beginTime": this.findBeginTime,
				"endTime": this.findEndTime
			}
			requestJava({
				url: '/transportRecord/findList',
				params
			}).then(res => {
				this.count = res.data.data.total
				this.tableData = res.data.data.list
			})
		},
		view(transportRecordID) {
			this.$router.push({ name: 'viewtmsarchive', query: { transportRecordID }})
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
