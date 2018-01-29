<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>无车承运人车源列表</span>
		  </div>
		  <div class="search">
		  	<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="报文参考号：">
			    <el-input  placeholder="报文参考号"></el-input>
			  </el-form-item>
			  <el-form-item label="单证名称：">
			    <el-input  placeholder="单证名称"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary">查询</el-button>
			    <el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
		  	<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
		  	<el-table :data="tableData" border style="width: 100%" size="mini">
			    <el-table-column sortable label="报文参考号">
			    </el-table-column>
			    <el-table-column sortable label="单证名称">
			    </el-table-column>
			    <el-table-column sortable label="发送时间">
			    </el-table-column>
			    <el-table-column sortable label="车辆牌照号">
			    </el-table-column>
			    <el-table-column sortable label="车型代码">
			    </el-table-column>
			    <el-table-column sortable label="车辆长度">
			    </el-table-column>
			    <el-table-column sortable label="核定载质量">
			    </el-table-column>
			    <el-table-column sortable label="出发地">
			    </el-table-column>
			    <el-table-column sortable label="目的地">
			    </el-table-column>
			    <el-table-column sortable label="状态">
			    </el-table-column>
			    <el-table-column sortable label="描述">
			    </el-table-column>
			    <el-table-column sortable label="创建时间">
			    </el-table-column>
			    <el-table-column label="操作">
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
				tableData: null
			}
		}
	}
</script>
<style lang="stylus">
	.main-content
		padding 20px
		.tableControl
			margin-bottom 10px
		.pagination
			margin-top 10px
			text-align center
		.table
			th
				.cell
					text-align center
</style>