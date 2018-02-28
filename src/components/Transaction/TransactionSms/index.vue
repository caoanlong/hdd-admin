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
					<el-table-column label="发送状态" prop="Status" width="80"></el-table-column>
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
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
				</div>
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
<style lang="stylus">
.table
	p
		margin 0
		padding 0
		
</style>