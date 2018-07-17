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
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="apiLogs" border style="width: 100%" size="mini">
					<el-table-column label="用户ID" prop="Mem_ID" width="160" align="center"></el-table-column>
					<el-table-column label="设备类型" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.DeviceType == 'Android'">安卓端</span>
							<span v-else-if="scope.row.DeviceType == 'iOS'">苹果端</span>
							<span v-else></span>
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
				<Page :total="count" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
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
	components: { Page },
	created() {
		this.getList()
	},
	methods: {
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
			this.findDeviceType = ''
			this.findLogType = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
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
		viewApiLog(id) {
			this.$router.push({ name: 'viewapilog', query: {Log_ID: id} })
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>