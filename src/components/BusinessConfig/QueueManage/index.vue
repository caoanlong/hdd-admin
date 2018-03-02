<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>队列配置列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="form-inline" size="small">
					<el-form-item label="业务类型">
						<el-input placeholder="请输入业务类型" v-model="findOpType"></el-input>
					</el-form-item>
					<el-form-item label="是否推送">
						<el-select placeholder="请选择" v-model="findIsPush">
							<el-option label="是" value="Y"></el-option>
							<el-option label="否" value="N"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否处理">
						<el-select placeholder="请选择" v-model="findIsFinish">
							<el-option label="是" value="Y"></el-option>
							<el-option label="否" value="N"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getQueueList(1)">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="addQueue">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center"></el-table-column>
					<el-table-column label="业务类型" prop="opType">
					</el-table-column>
					<el-table-column label="业务ID" prop="opID">
					</el-table-column>
					<el-table-column label="业务参数" prop="opArgs">
					</el-table-column>
					<el-table-column label="业务时间" width="140" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.opTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="业务接口" prop="opInterface">
					</el-table-column>
					<el-table-column label="暂停推送" prop="isPausePush" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.isPausePush =='Y'">是</span>
							<span v-else>否</span>
						</template>
					</el-table-column>
					<el-table-column label="是否推送" prop="isPush" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.isPush =='Y'">是</span>
							<span v-else>否</span>
						</template>
					</el-table-column>
					<el-table-column label="处理状态" prop="isFinish" align="center" width="80">
						<template slot-scope="scope">
							<span v-if="scope.row.isFinish =='Y'">是</span>
							<span v-else>否</span>
						</template>
					</el-table-column>
					<el-table-column label="处理记录" prop="execRows" align="center" width="80">
					</el-table-column>
					<el-table-column label="处理结果" prop="execContent">
					</el-table-column>
					<el-table-column label="更新人" prop="updateByName" align="center">
					</el-table-column>
					<el-table-column label="更新时间" width="140" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.updateTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="default" size="mini" icon="el-icon-edit" title>编辑</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getQueueList()">
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
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			findOpType:'',
			findIsPush:'',
			findIsFinish:''
		}
	},
	created() {
		this.getQueueList()
	},
	methods: {
		addQueue() {
			this.$router.push({ name: 'addqueue' })
		},
		pageChange(index) {
			this.getQueueList(index)
		},
		reset() {
			this.findOpType = '',
			this.findIsPush = '',
			this.findIsFinish = ''
			this.getQueueList()
		},
		getQueueList(pageNum) {
			let params = {
				pageNum: pageNum || 1,
				pageSize: this.pageSize,
				opType: this.findOpType,
				isPush: this.findIsPush,
				isFinish: this.findIsFinish
			}
			requestJava({
				url: '/setQueue/configuration/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.message)
				}
			})
		},
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		}

	}
}

</script>
<style lang="stylus">


</style>
