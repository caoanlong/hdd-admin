<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>系统日志</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="form-inline"  size="small">
					<el-form-item label="操作菜单">
						<el-input  placeholder="请输入..." v-model="findTitle"></el-input>
					</el-form-item>
					<el-form-item label="用户ID">
						<el-input  placeholder="请输入..." v-model="findCreateBy"></el-input>
					</el-form-item>
					<el-form-item label="URI">
						<el-input  placeholder="请输入..." v-model="findRequestUri"></el-input>
					</el-form-item>
					<el-form-item label="日期范围">
						<el-date-picker
							v-model="findDataRange"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="只查询异常信息">
						<el-switch v-model="findIsException"></el-switch>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="logs" border style="width: 100%" size="mini">
					<el-table-column label="操作菜单" prop="Title" width="150"></el-table-column>
					<el-table-column label="操作用户" prop="sys_user.Name"></el-table-column>
					<el-table-column label="所在公司" prop="sys_user.company.Name"></el-table-column>
					<el-table-column label="所在部门" prop="sys_user.department.Name"></el-table-column>
					<el-table-column label="URI" prop="RequestUri"></el-table-column>
					<el-table-column label="提交方式" align="center" prop="Method" width="100"></el-table-column>
					<el-table-column label="操作者IP" align="center" prop="RemoteAddr"></el-table-column>
					<el-table-column label="操作时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.CreateDate).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../../common/request'
import { Message } from 'element-ui'
import Page from '../../../CommonComponents/Page'
export default {
	data() {
		return {
			findTitle: '',
			findCreateBy: '',
			findRequestUri: '',
			findDataRange: '',
			startDate: '',
			endDate: '',
			findIsException: false,
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			logs: []
		}
	},
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			this.startDate = date[0]
			this.endDate = date[1]
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
			this.findTitle = ''
			this.findCreateBy = ''
			this.findRequestUri = ''
			this.findDataRange = ''
			this.findIsException = false
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				Title: this.findTitle,
				CreateBy: this.findCreateBy,
				RequestUri: this.findRequestUri,
				startDate: this.startDate,
				endDate: this.endDate,
				isException: this.findIsException,
			}
			request({
				url: '/sys_log/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.logs = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
		
</style>