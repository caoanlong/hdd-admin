<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>常量列表</span>
			</div>
            <div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="用户ID" prop="memberID" width="150"></el-table-column>
					<el-table-column label="用户名" prop="userName"></el-table-column>
					<el-table-column label="联系人" prop="contact"></el-table-column>
					<el-table-column label="公司名称" prop="companyName"></el-table-column>
					<el-table-column label="公司地址" prop="companyArea"></el-table-column>
					<el-table-column label="申请状态">
						<template slot-scope="scope">
							<span v-if="scope.row.auditStatus == 'Draft'">草稿</span>
							<span v-else-if="scope.row.auditStatus == 'Pending'">待审核</span>
							<span v-else-if="scope.row.auditStatus == 'Passed'">已开通</span>
							<span v-else-if="scope.row.auditStatus == 'Rejected'">已拒绝</span>
						</template>
					</el-table-column>
					<el-table-column label="申请时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.applyTime">{{scope.row.applyTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="通过时间" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.auditTime">{{scope.row.auditTime | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="230" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-view" @click="view(scope.row.applyRecordID)">查看</el-button>
							<el-button size="mini" icon="el-icon-edit" @click="edit(scope.row.applyRecordID)">编辑</el-button>
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.applyRecordID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList">
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
import requestJava from '../../../../common/requestJava'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			tableData: [],
			selectedList: [],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		getList() {
			let params = {
				current: this.pageIndex || 1,
                size: this.pageSize,
                name: '',
                type: '',
                value: ''
			}
			requestJava({
				url: '/base/const/findList',
				method: 'get',
				params
			}).then(res => {
				console.log(res.data.data)
				if (res.data.code == 200) {
					this.count = res.data.data.total
					this.tableData = res.data.data.list
				} else {
					Message.error(res.data.msg)
				}
			})
        },
        add() {
            this.$router.push({ name: 'addtmsconst' })
        },
		view(applyRecordID) {
			this.$router.push({ name: 'viewtmsconst', query: {applyRecordID} })
        },
        edit(applyRecordID) {
            this.$router.push({ name: 'edittmsconst', query: {applyRecordID} })
        },
		selectionChange(data) {
			this.selectedList = data.map(item => item.applyRecordID)
        },
        deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedList.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedList
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.del(ids)
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		del(ids) {
			let data = {
				ids: ids
			}
			requestJava({
				url: '/base_truckbrand/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getTruckBrands()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
.table-img
	width 30px
	cursor pointer
</style>
