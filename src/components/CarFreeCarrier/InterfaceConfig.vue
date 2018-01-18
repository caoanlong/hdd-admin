<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>无车承运人接口配置</span>
		  </div>
		  <div class="search">
		  	<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="appKey：">
			    <el-input  placeholder="appKey"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary">查询</el-button>
			    <el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
		  	<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
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