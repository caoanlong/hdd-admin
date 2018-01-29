<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>无车承运人接口配置列表</span>
			</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="appKey：">
						<el-input placeholder="appKey"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="jump('interface','add')">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" border style="width: 100%" size="mini">
					<el-table-column sortable label="企业名称">
					</el-table-column>
					<el-table-column sortable label="企业接入码">
					</el-table-column>
					<el-table-column sortable label="Appkey">
					</el-table-column>
					<el-table-column sortable label="报文功能代码">
					</el-table-column>
					<el-table-column sortable label="报文版本号">
					</el-table-column>
					<el-table-column sortable label="接收方代码">
					</el-table-column>
					<el-table-column sortable label="用户名">
						<el-input auto-complete="off"></el-input>
					</el-table-column>
					<el-table-column label="操作" width="280" align="center">
						<template slot-scope="scope">							
							<el-button type="default" size="mini" icon="el-icon-view">查看</el-button>
							<el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit">修改</el-button>
							<el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"> 删除</el-button>
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
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		jump(routerName, params) {
			if (this.$router) {
				this.$router.push({ name: routerName, query: { type: params } })
			}
		}
	}
}

</script>
<style lang="stylus">


</style>
