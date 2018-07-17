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
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
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
			findBusinessType: '',
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tranSms: []
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
			this.findBusinessType = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
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
		}
	}
}
</script>
<style lang="stylus" scoped>

</style>