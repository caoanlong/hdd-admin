<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>消息列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="推送状态">
						<el-select placeholder="请选择" v-model="findPushStatus">
							<el-option label="成功" value="Success"></el-option>
							<el-option label="失败" value="Failed"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getMessages(1)">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-form :inline="true" class="form-inline">
					<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="messages" border style="width: 100%" size="mini">
					<el-table-column label="推送页面" prop="msgTemplate.AppPage.Name"></el-table-column>
					<el-table-column label="接收人" prop="mem_rec.RealName" width="90" align="center"></el-table-column>
					<el-table-column label="发送人" prop="mem_send.RealName" width="90" align="center"></el-table-column>
					<el-table-column label="内容" prop="Content"></el-table-column>
					<el-table-column label="业务ID" prop="OpID"></el-table-column>
					<el-table-column label="推送状态" align="center" width="60">
						<template slot-scope="scope">
							<span>{{scope.row.PushStatus == 'Success' ? '成功' : '失败'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="推送时间">
						<template slot-scope="scope">
							<span v-if="scope.row.PushTime">{{new Date(scope.row.PushTime).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="推送结果" prop="PushResult"></el-table-column>
					<el-table-column label="极光类型" prop="PushType" width="60"></el-table-column>
					<el-table-column label="极光ID" prop="PushID"></el-table-column>
					<!-- <el-table-column label="更新时间">
						<template slot-scope="scope">
							<span v-if="scope.row.UpdateTime">{{new Date(scope.row.UpdateTime).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column> -->
					<el-table-column label="是否查看" width="80" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.IsView == 'N' ? '否' : '是'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="App类型" prop="AppType"></el-table-column>
					<el-table-column label="手机类型" prop="PhoneType"></el-table-column>
					<el-table-column label="推送消息标题" prop="Title"></el-table-column>
					<el-table-column label="操作" width="180" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="viewMessage(scope.row.Msg_ID)">查看</el-button>
							<el-button type="default" size="mini">再次发送</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getMessages()">
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
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			findPushStatus: '',
			messages: []
		}
	},
	created() {
		this.getMessages()
	},
	methods: {
		pageChange(index) {
			this.getMessages(index)
		},
		// 重置搜索表单
		reset() {
			this.findPushStatus = ''
		},
		getMessages(pageIndex) {
			let params = {
				pageIndex: pageIndex || 1,
				pageSize: this.pageSize,
				PushStatus: this.findPushStatus,
			}
			request({
				url: '/set_message/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.messages = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		viewMessage(Msg_ID) {
			this.$router.push({ name: 'viewmessage', query: {Msg_ID} })
		},
	}
}

</script>
<style lang="stylus" scoped>


</style>
