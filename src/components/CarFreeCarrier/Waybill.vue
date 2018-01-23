<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>无车承运人运单列表</span>
		  </div>
		  <div class="search">
		  	<el-form :inline="true"  class="demo-form-inline"  size="small">
			  <el-form-item label="托运单号：">
			    <el-input  placeholder="托运单号"></el-input>
			  </el-form-item>
			  <el-form-item label="承运人：">
			    <el-input  placeholder="承运人"></el-input>
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
			    <el-table-column sortable label="托运单号">
			    </el-table-column>
			    <el-table-column sortable label="承运人" align="center">
			    	<template slot-scope="scope">
						<el-popover trigger="hover" placement="top-start">
							<p>姓名: {{ scope.row.name }}</p>
							<p>装货住址: {{ scope.row.address }}</p>
							<div slot="reference" class="name-wrapper">
								<el-tag size="mini">{{ scope.row.name }}</el-tag>
							</div>
						</el-popover>
					</template>
			    </el-table-column>
			    <el-table-column sortable label="托运时间" prop="date" align="center">
					<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.date }}</span>
					</template>
			    </el-table-column>
			    <el-table-column sortable label="实际发运时间" width="140" prop="date" align="center">
		    		<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.date }}</span>
					</template>
			    </el-table-column>
			    <el-table-column sortable label="收货时间" prop="date" align="center">
			    	<template slot-scope="scope">
						<i class="el-icon-time"></i>
						<span>{{ scope.row.date }}</span>
					</template>
			    </el-table-column>
			    <el-table-column sortable label="发货人" prop="name" align="center">
			    </el-table-column>
			    <el-table-column sortable label="装货地点" prop="address">
			    </el-table-column>
			    <el-table-column sortable label="收货人" prop="name" align="center">
			    </el-table-column>
			    <el-table-column sortable label="状态">
			    </el-table-column>
			    <el-table-column sortable label="错误描述">
			    </el-table-column>
			    <el-table-column sortable label="创建时间" prop="date" align="center">
			    </el-table-column>
			    <el-table-column label="操作" width="160" align="center">
			    	<template slot-scope="scope">
				        <el-button-group>
						  <el-button type="default" size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-view"></el-button>
						  <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
						  <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
						</el-button-group>
				    </template>
			    </el-table-column>
			  </el-table>
			  <div class="pagination">
			  	<el-pagination background layout="prev, pager, next" :total="500"></el-pagination>
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