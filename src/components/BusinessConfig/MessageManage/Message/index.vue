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
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
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
					<el-table-column label="是否查看" width="80" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.IsView == 'N' ? '否' : '是'}}</span>
						</template>
					</el-table-column>
					<el-table-column label="App类型" prop="AppType"></el-table-column>
					<el-table-column label="手机类型" prop="PhoneType"></el-table-column>
					<el-table-column label="推送消息标题" prop="Title"></el-table-column>
					<el-table-column label="操作" width="180" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view" @click="viewMessage(scope.row.Msg_ID)">查看</el-button>
							<el-button type="default" size="mini">再次发送</el-button>
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
			refreshing: false,
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			findPushStatus: '',
			messages: []
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
			this.findPushStatus = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList(pageIndex) {
			let params = {
				pageIndex: this.pageIndex,
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
