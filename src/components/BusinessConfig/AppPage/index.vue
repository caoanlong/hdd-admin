<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>APP页面</span>
		  </div>
		  <div class="tableControl">
		  	<el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
		  	<el-table :data="tableData5" border style="width: 100%" size="mini">
		  		<el-table-column type="expand">
		  			<template slot-scope="props">
				        <el-form label-position="left" inline class="table-expand">
					        <el-form-item label="装货地点">
					          	<span>{{ props.row.address }}</span>
							</el-form-item>
							<el-form-item label="错误描述">
					          	<span>{{ props.row.desc }}</span>
							</el-form-item>
				        </el-form>
				    </template>
		  		</el-table-column>
			    <el-table-column sortable label="托运单号">
			    </el-table-column>
			    <el-table-column sortable label="承运人">
			    </el-table-column>
			    <el-table-column sortable label="托运时间">
			    </el-table-column>
			    <el-table-column sortable label="实际发运时间" width="140">
			    </el-table-column>
			    <el-table-column sortable label="收货时间">
			    </el-table-column>
			    <el-table-column sortable label="发货人">
			    </el-table-column>
			    <el-table-column sortable label="收货人">
			    </el-table-column>
			    <el-table-column sortable label="状态">
			    </el-table-column>
			    <el-table-column sortable label="创建时间">
			    </el-table-column>
			    <el-table-column label="操作" width="160" align="center">
			    	<template slot-scope="scope">
				        <el-button-group>
						  <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" title></el-button>
						  <el-button type="default" size="mini" @click="handleDelete(scope.$index, scope.row)"icon="el-icon-view"></el-button>
						  <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
						</el-button-group>
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
	        tableData5: [{
	          id: '12987122',
	          name: '好滋好味鸡蛋仔',
	          category: '江浙小吃、小吃零食',
	          desc: '荷兰优质淡奶，奶香浓而不腻',
	          address: '上海市普陀区真北路',
	          shop: '王小虎夫妻店',
	          shopId: '10333'
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
		.table
			th
				.cell
					text-align center
			.table-expand
				font-size 0
				label
					width 120px
					text-align right
					color #99a9bf
				.el-form-item
					margin-right 0
					margin-bottom 0
					width 100%
</style>