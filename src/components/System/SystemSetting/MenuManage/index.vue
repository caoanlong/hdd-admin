<template>
	<div class="main-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>菜单列表</span>
		  </div>
		  <div class="tableControl">
		  	<el-button type="default" size="mini" icon="el-icon-plus" @click="jump('/addmenu')">添加</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-edit">修改</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
		  	<el-button type="default" size="mini"><svg-icon icon-class="save_icon"></svg-icon> 保存排序</el-button>
		  	<el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
		  </div>
		  <div class="table">
		  	<el-table :data="tableData" border style="width: 100%" size="mini">
			    <el-table-column  type="selection" align="center">
			    </el-table-column>
			    <el-table-column  label="名称" prop="name">
			    </el-table-column>
			    <el-table-column  label="链接" prop="url">
			    </el-table-column>
			    <el-table-column  label="排序" prop="sort" width="120" align="center">
			    </el-table-column>
			    <el-table-column  label="可见" prop="visibility" width="120" align="center">
			    </el-table-column>
			    <el-table-column  label="权限标识">
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template slot-scope="scope">
						<el-button-group>
							<el-button type="default" size="mini" icon="el-icon-view"></el-button><el-button type="primary" size="mini" icon="el-icon-edit" title></el-button><el-button type="default" size="mini" icon="el-icon-delete"></el-button><el-button type="danger" size="mini" icon="el-icon-plus"></el-button>
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
		        tableData: [{url: '2016-05-02',
		          name: '无车承运人',
		          url:'/home',
		          sort: '1',
		          visibility:'可见',
		          permission:''
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
			jump(to){
				if (this.$router) {
			        this.$router.push(to)
			      }
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
</style>