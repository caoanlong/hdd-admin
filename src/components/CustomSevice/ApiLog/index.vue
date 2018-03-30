<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>API请求日志</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="请求参数">
						<el-input placeholder="请输入..." v-model="findReqParams"></el-input>
					</el-form-item>
					<el-form-item label="设备类型">
						<el-select placeholder="请选择" v-model="findDeviceType">
							<el-option label="苹果端" value="iOS"></el-option>
							<el-option label="安卓端" value="Android"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日志类型">
						<el-input placeholder="请输入..." v-model="findLogType"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getApiLogs(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="apiLogs" border style="width: 100%" size="mini">
					<el-table-column label="用户ID" prop="Mem_ID" width="160" align="center"></el-table-column>
					<el-table-column label="设备类型" width="100" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.DeviceType == 'iOS' ? '苹果端' : '安卓端'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="日志类型" prop="LogType" width="100" align="center"></el-table-column>
					<el-table-column label="请求参数" prop="ReqParams"></el-table-column>
					<el-table-column label="响应参数" prop="RespParams"></el-table-column>
					<el-table-column label="请求时间" width="140">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.RequestDate).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="响应时间" width="140">
						<template slot-scope="scope">
							<span>{{new Date(scope.row.ResponseDate).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="85" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="viewApiLog(scope.row.Log_ID)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getApiLogs()">
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
	import request from '../../../common/request'
	import { Message } from 'element-ui'
	export default {
		data() {
			return {
				findReqParams: '',
				findDeviceType: '',
				findLogType: '',
				refreshing: false,
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				apiLogs: []
			}
		},
		created() {
			this.getApiLogs()
		},
		methods: {
			getApiLogs(pageIndex) {
				let params = {
					pageIndex: pageIndex || 1,
					pageSize: this.pageSize,
					ReqParams: this.findReqParams,
					DeviceType: this.findDeviceType,
					LogType: this.findLogType
				}
				request({
					url: '/sys_logapi/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.apiLogs = res.data.data.rows
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			pageChange(index) {
				this.getApiLogs(index)
			},
			// 重置搜索表单
			reset() {
				this.findMobile = ''
				this.findDeviceType = ''
				this.findLogType = ''
			},
			refresh() {
				this.refreshing = true
				this.getApiLogs()
				setTimeout(() => {
					this.refreshing = false
				}, 500)
			},
			viewApiLog(id) {
				this.$router.push({ name: 'viewapilog', query: {Log_ID: id} })
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>