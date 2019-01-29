<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>系统日志</span>
			</div>
			<div class="search">
				<el-form :inline="true"  class="form-inline"  size="small">
					<!-- <el-form-item label="操作菜单">
						<el-input  placeholder="请输入..." v-model="findTitle"></el-input>
					</el-form-item>
					<el-form-item label="用户ID">
						<el-input  placeholder="请输入..." v-model="findCreateBy"></el-input>
					</el-form-item> -->
					<el-form-item label="URI">
						<el-input  placeholder="请输入..." v-model="find.uri"></el-input>
					</el-form-item>
					<el-form-item label="日期范围">
						<el-date-picker 
							value-format="timestamp"
							v-model="findDataRange"
							type="daterange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="selectDateRange">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="只查询异常信息">
						<el-radio v-model="find.isException" label="Y">是</el-radio>
						<el-radio v-model="find.isException" label="N">否</el-radio>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="table">
				<el-table :data="logs" border style="width: 100%" size="mini">
					<!-- <el-table-column label="操作菜单" prop="Title" width="150"></el-table-column>
					<el-table-column label="操作用户" prop="sys_user.Name"></el-table-column> -->
					<el-table-column label="URI" prop="uri"></el-table-column>
					<el-table-column label="异常信息" prop="exceptionInfo"></el-table-column>
					<el-table-column label="提交方式" align="center" prop="method" width="100"></el-table-column>
					<el-table-column label="操作者IP" align="center" prop="ip"></el-table-column>
					<el-table-column label="操作时间" align="center" width="140">
						<template slot-scope="scope">
							<span>{{ scope.row.requestDate | getdatefromtimestamp() }}</span>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import SysLog from '../../../../api/SysLog'
import { baseMixin } from '../../../../common/mixin'
export default {
	mixins: [baseMixin],
	data() {
		return {
			find: {
				uri: '',
				startDate: '',
				endDate: '',
				isException: 'N'
			},
			findDataRange: '',
			logs: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		selectDateRange(date) {
			console.log(date)
			this.find.startDate = date[0]
			this.find.endDate = date[1]
		},
		reset() {
			this.find.uri = ''
			this.findDataRange = ''
			this.find.isException = 'N'
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			SysLog.apiList({
				current: this.pageIndex,
				size: this.pageSize,
				uri: this.find.uri,
				startDate: this.find.startDate,
				endDate: this.find.endDate,
				isException: this.find.isException
			}).then(res => {
				this.total = res.total
				this.logs = res.records
			})
		}
	}
}
</script>
<style lang="stylus" scoped>
		
</style>