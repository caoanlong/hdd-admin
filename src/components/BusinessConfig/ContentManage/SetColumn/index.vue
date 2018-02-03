<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>栏目列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addColumn">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete"  @click.native="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column type="selection" align="center">
					</el-table-column>
					<el-table-column label="栏目名称" prop="name">
					</el-table-column>
					<el-table-column label="代码" prop="code">
					</el-table-column>
					<el-table-column label="类型" prop="sortType">
					</el-table-column>
					<el-table-column label="是否启用" width="120" align="center" prop="Enabled">
					</el-table-column>
					<el-table-column label="操作" width="160" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-edit" @click.native="editColumn(scope.row._id)">修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row._id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
				</div>
			</div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
export default {
	data() {
      	return {
	        tableData: [
				{
					name: '协议',
					code:'Agreement',
					sortType: '',
					Enabled:'是'
				},
				{
					name: '常见问题',
					code:'CommonProblem',
					sortType: '',
					Enabled:'是'
				},
				{
					name: '版本',
					code:'Version',
					sortType: '',
					Enabled:'是'
				}	
	        ],
	        selectedColumns: []
		}
    },
    methods: {
		addColumn() {
			this.$router.push({name: 'addcolumn'})
		},
		editColumn(id) {
			this.$router.push({name: 'editcolumn', query: {id: id}})
		},
		deleteConfirm(id) {
				let ids = []
				if (id && typeof id == 'string') {
					ids = [].concat(id)
				} else {
					if(this.selectedColumns.length == 0){
						this.$message({
							message:'请选择要删除的栏目',
							type:'warning'
						})
						
						console.log(this.selectedColumns.length)
						return
					}
					ids = this.selectedColumns
				}
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delColumn(ids)
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
			delColumn(ids) {
				let data = {
					ids: ids
				}
				request({
					url: '/column/delete',
					method: 'post',
					data
				}).then(res => {
					if (res.data.code == 0) {
						this.getColumns()
					} else {
						Message.error(res.data.msg)
					}
				})
			}
	}
}
</script>
<style lang="stylus">
	
</style>