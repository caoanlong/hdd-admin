<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>交易短信日志</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="业务类型">
						<el-input placeholder="请输入..." v-model="findBusinessType"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getTranSms(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tranSms" border style="width: 100%" size="mini">
					<el-table-column label="业务类型" prop="BusinessType"></el-table-column>
					<el-table-column label="短信模板ID" prop="SmsTemplateId"></el-table-column>
					<el-table-column label="手机号" prop="Phones" width="100"></el-table-column>
					<el-table-column label="发送状态" width="80">
						<template slot-scope="scope">
							<span>{{scope.row.Status == 'Success' ? '成功' : '失败'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="发送内容" prop="SendData"></el-table-column>
					<el-table-column label="成功数量" prop="SuccessCounts" width="100"></el-table-column>
					<el-table-column label="响应消息ID" prop="ResultId"></el-table-column>
					<el-table-column label="响应码" prop="ResultCode"></el-table-column>
					<el-table-column label="响应内容" prop="ResultMsg"></el-table-column>
					<el-table-column label="创建时间" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.CreateTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="发送时间" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.SendTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getTranSms()">
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
				findBusinessType: '',
				refreshing: false,
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				tranSms: []
			}
		},
		created() {
			this.getTranSms()
		},
		methods: {
			getTranSms(pageIndex) {
				let params = {
					pageIndex: pageIndex || 1,
					pageSize: this.pageSize,
					BusinessType: this.findBusinessType
				}
				request({
					url: '/sys_logsms/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.tranSms = res.data.data.rows
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			pageChange(index) {
				this.getTranSms(index)
			},
			// 重置搜索表单
			reset() {
				this.findBusinessType = ''
			},
			refresh() {
				this.refreshing = true
				this.getTranSms()
				setTimeout(() => {
					this.refreshing = false
				}, 500)
			}
		}
	}
</script>
<style lang="stylus" scoped>

</style>