<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>短信日志</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="form-inline"  size="small">
					<el-form-item label="手机号">
						<el-input  placeholder="请输入..." v-model="findPhones"></el-input>
					</el-form-item>
					<el-form-item label="业务类型">
						<el-select placeholder="请选择" v-model="findBusinessType">
							<el-option label="注册" value="VERFIFY_CODE_REGISTER"></el-option>
							<el-option label="登录" value="VERFIFY_CODE_SINGIN"></el-option>
							<el-option label="更换手机号" value="VERFIFY_CODE_UPDATE_PHONE"></el-option>
							<el-option label="重置支付密码" value="VERIFY_CODE_PAY_PASSWORD_RESET"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findStatus">
							<el-option label="成功" value="Success"></el-option>
							<el-option label="发送中" value="Sending"></el-option>
							<el-option label="失败" value="Failed"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="smsLogs" border style="width: 100%" size="mini">
					<el-table-column label="手机号" prop="Phones" width="120"></el-table-column>
					<el-table-column label="发送内容" prop="TemplateContent"></el-table-column>
					<el-table-column label="返回结果" prop="ResultMsg"></el-table-column>
					<el-table-column label="状态" prop="Status" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.Status == 'Success'">成功</span>
							<span v-else-if="scope.row.Status == 'Failed'">失败</span>
							<span v-else-if="scope.row.Status == 'Sending'">发送中</span>
						</template>
					</el-table-column>
					<el-table-column label="业务类型" prop="BusinessType">
						<template slot-scope="scope">
							<span v-if="scope.row.BusinessType == 'VERFIFY_CODE_REGISTER'">注册</span>
							<span v-else-if="scope.row.BusinessType == 'VERFIFY_CODE_SINGIN'">登录</span>
							<span v-else-if="scope.row.BusinessType == 'VERFIFY_CODE_UPDATE_PHONE'">更换手机号</span>
							<span v-else-if="scope.row.BusinessType == 'VERIFY_CODE_PAY_PASSWORD_RESET'">重置支付密码</span>
						</template>
					</el-table-column>
					<el-table-column label="验证码" prop="SendData"></el-table-column>
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
			findPhones: '',
			findBusinessType: '',
			findStatus: '',
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			smsLogs: []
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
			this.findPhones = ''
			this.findBusinessType = ''
			this.findStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				Phones: this.findPhones,
				BusinessType: this.findBusinessType,
				Status: this.findStatus
			}
			request({
				url: '/sys_logsms/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.smsLogs = res.data.data.rows
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