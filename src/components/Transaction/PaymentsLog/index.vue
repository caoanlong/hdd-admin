<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>支付接口日志</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="支付订单ID">
						<el-input placeholder="请输入..." v-model="findPayLoginvokeID"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getPayLogs(1)">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="payLogs" border style="width: 100%" size="mini">
					<el-table-column label="支付订单ID" prop="PayLogInvoke_ID"></el-table-column>
					<el-table-column label="三方支付平台代码" prop="PayPlatformCode"></el-table-column>
					<el-table-column label="三方交易记录ID" prop="Pay3rdOrderCode"></el-table-column>
					<el-table-column label="接口URI" prop="Uri"></el-table-column>
					<el-table-column label="接口名称" prop="ApiName"></el-table-column>
					<el-table-column label="是否回调" width="100">
						<template slot-scope="scope">
							<span>{{ scope.row.Async == 'Y' ? '是' : '否' }}</span>
						</template>
					</el-table-column>
					<el-table-column label="请求参数" prop="ReqParams"></el-table-column>
					<el-table-column label="响应参数" prop="RespParams"></el-table-column>
					<el-table-column label="请求时间" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.ReqTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
					<el-table-column label="响应时间" width="140">
						<template slot-scope="scope">
							<span>{{ new Date(scope.row.RespTime).getTime() | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getPayLogs()">
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
				findPayLoginvokeID: '',
				refreshing: false,
				pageIndex: 1,
				pageSize: 10,
				count: 0,
				payLogs: []
			}
		},
		created() {
			this.getPayLogs()
		},
		methods: {
			getPayLogs(pageIndex) {
				let params = {
					pageIndex: pageIndex || 1,
					pageSize: this.pageSize,
					PayLogInvoke_ID: this.findPayLoginvokeID
				}
				request({
					url: '/pay_loginvoke/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.payLogs = res.data.data.rows
					} else {
						Message.error(res.data.msg)
					}
				})
			},
			pageChange(index) {
				this.getPayLogs(index)
			},
			// 重置搜索表单
			reset() {
				this.findPayLoginvokeID = ''
			},
			refresh() {
				this.refreshing = true
				this.getPayLogs()
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