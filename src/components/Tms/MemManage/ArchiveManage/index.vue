<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>档案列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="创建时间">
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
				<el-table :data="tableData" border style="width: 100%" size="mini">
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
					<el-table-column label="创建时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.createTime">{{scope.row.createTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="建档时间" width="140">
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
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			findRangeDate: [],
			findBeginTime: '',
			findEndTime: '',
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.findBeginTime = new Date(date[0]).getTime()
			this.findEndTime = new Date(date[1]).getTime()
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findRangeDate = []
			this.findBeginTime = ''
			this.findEndTime = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				"current": this.pageIndex,
				"size": this.pageSize,
				"createTimeBegin": this.findBeginTime,
				"createTimeEnd": this.findEndTime
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
