<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>提现管理</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="手机号：">
						<el-input placeholder="请输入手机号" v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select placeholder="请选择" v-model="findStatus">
							<el-option label="草稿" value="Draft"></el-option>
							<el-option label="待审核" value="ForAudit"></el-option>
							<el-option label="已拒绝" value="Rejected"></el-option>
							<el-option label="处理中" value="Paying"></el-option>
							<el-option label="失败" value="Failed"></el-option>
							<el-option label="成功" value="Success"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="提现日期：">
						<el-date-picker 
							v-model="findDataRange" 
							type="daterange" 
							range-separator="至" 
							start-placeholder="开始日期" 
							end-placeholder="结束日期" 
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>			
					<el-form-item>
						<el-button type="primary" @click.native="getList">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column label="提现单号" prop="cashID" align="center" width="150">
					</el-table-column>
					<el-table-column label="提现时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{scope.row.cashTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机号" align="center" prop="mobile" width="100">
					</el-table-column>
					<el-table-column label="姓名" prop="name" align="center">
					</el-table-column>
					<el-table-column label="提现金额" align="center" prop="money">
					</el-table-column>
					<el-table-column label="手续费" align="center" prop="fee">
					</el-table-column>
					<el-table-column label="卡号" prop="bankCardNum" width="180" align="center">
					</el-table-column>
					<el-table-column label="状态" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.status=='Draft'" style="color:#C0C4CC">草稿</span>
							<span v-else-if="scope.row.status=='ForAudit'" style="color:#409EFF">待审核</span>
							<span v-else-if="scope.row.status=='Rejected'" style="color:#F56C6C">已拒绝</span>
							<span v-else-if="scope.row.status=='Paying'" style="color:#409EFF">处理中</span>
							<span v-else-if="scope.row.status=='Success'" style="color:#67C23A">成功</span>
							<span v-else style="color:#C0C4CC">失败</span>
						</template>
					</el-table-column>
					<el-table-column label="审批时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="审批人" align="center" prop="auditBy" width="100">
					</el-table-column>
					<el-table-column label="操作" width="160" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewWithDraw(scope.row.mobile,scope.row.cashID)">查看</el-button>
							<el-button size="mini" @click="EditWithDraw(scope.row.mobile,scope.row.cashID)" v-if="scope.row.status=='ForAudit'">
								<svg-icon icon-class="approve-icon"></svg-icon> 审核
							</el-button>
						</template>
					</el-table-column>
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
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			findMobile:'',
			findStatus:'',
			findDataRange: [],
			startDate: '',
			endDate: ''
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.startDate = new Date(date[0]).getTime()
			this.endDate = new Date(date[1]).getTime()
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
			this.findMobile = ''
			this.findStatus = ''
			this.findDataRange = []
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				mobile: this.findMobile,
				status: this.findStatus,
				cashBeginTime: this.startDate,
				cashEndTime: this.endDate
			}
			requestJava({
				url: '/payCash/list',
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
		viewWithDraw(mobile,cashID) {
			this.$router.push({ name: 'viewwithdraw', query: { mobile,cashID} })
		},
		EditWithDraw(mobile,cashID) {
			this.$router.push({ name: 'editwithdraw', query: { mobile,cashID} })
		}
	}
}

</script>
<style lang="stylus" scoped>

</style>
