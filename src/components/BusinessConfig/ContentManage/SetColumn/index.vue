<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>栏目列表</span>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
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
					<el-table-column label="是否启用" width="120" sortable align="center" prop="Enabled">
					</el-table-column>
					<el-table-column label="操作" width="190" align="center">
						<template slot-scope="scope">
							<el-button type="default" size="mini" icon="el-icon-edit" title>修改</el-button>
							<el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
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
	        ]
		}
    }
}
</script>
<style lang="stylus">
	
</style>