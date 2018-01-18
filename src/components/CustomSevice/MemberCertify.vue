<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>会员列表</span>
		  </div>
		  <div class="search">
		  	<el-form :inline="true"  class="form-inline"  size="small">
			  <el-form-item label="会员类型：">
			    <el-input  placeholder="会员类型"></el-input>
			  </el-form-item>
			  <el-form-item label="关键字：">
			    <el-input  placeholder="关键字"></el-input>
			  </el-form-item>
			  <el-form-item label="状态：">
			    <el-select placeholder="请选择" style="width:100px">
			      <el-option label="启用" value=" "></el-option>
			      <el-option label="封停" value=" "></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="认证状态：">
			    <el-select placeholder="请选择" style="width:100px">
			      <el-option label="草稿" value=" "></el-option>
			      <el-option label="已提交" value=" "></el-option>
			      <el-option label="成功" value=" "></el-option>
			      <el-option label="失败" value=" "></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary">查询</el-button>
			    <el-button type="default">重置</el-button>
			  </el-form-item>
			</el-form>
		  </div>
		  <div class="tableControl">
		  	<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
		  	<el-table :data="tableData" border style="width: 100%" size="mini">
			    <el-table-column sortable label="会员类型">
			    </el-table-column>
			    <el-table-column sortable label="姓名">
			    </el-table-column>
			    <el-table-column sortable label="手机号">
			    </el-table-column>
			    <el-table-column sortable label="车牌/企业名">
			    </el-table-column>
			    <el-table-column sortable label="注册时间">
			    </el-table-column>
			    <el-table-column sortable label="最后登录">
			    </el-table-column>
			    <el-table-column sortable label="状态">
			    </el-table-column>
			    <el-table-column sortable label="申请时间">
			    </el-table-column>
			    <el-table-column sortable label="认证人">
			    </el-table-column>
			    <el-table-column sortable label="认证时间">
			    </el-table-column>
			    <el-table-column sortable label="认证状态">
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