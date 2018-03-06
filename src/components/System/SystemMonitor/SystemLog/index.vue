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
						<el-button type="primary" @click.native="getLogs(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
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
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getLogs()">
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
	import request from '../../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				findTitle: '',
				findCreateBy: '',
				findRequestUri: '',
				findDataRange: '',
				startDate: 0,
				endDate: 0,
				findIsException: false,
				refreshing: false,
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				logs: []
			}
		},
		created() {
			this.getLogs()
		},
		methods: {
			selectDateRange(date) {
				this.startDate = date[0]
				this.endDate = date[1]
				console.log(date)
			},
			getLogs(pageIndex) {
				let params = {
					pageIndex: pageIndex || 1,
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
			},
			pageChange(index) {
				this.getLogs(index)
			},
			// 重置搜索表单
			reset() {
				this.findTitle = ''
				this.findCreateBy = ''
				this.findRequestUri = ''
				this.findDataRange = ''
				this.findIsException = false
			},
			refresh() {
				this.refreshing = true
				this.getLogs()
				setTimeout(() => {
					this.refreshing = false
				}, 500)
			}
		}
	}
</script>
<style lang="stylus" scoped>
		
</style>