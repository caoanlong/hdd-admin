<template>
	<div class="main-content">
		<el-card class="box-card">
		    <div slot="header" class="clearfix">
		        <span>消息模板列表</span>
		    </div>
		    <div class="tableControl">
                <el-form :inline="true"  class="form-inline">
                    <el-button type="default" size="mini" icon="el-icon-plus">添加</el-button>
                    <el-button type="default" size="mini" icon="el-icon-delete">批量删除</el-button>
                    <el-button type="default" size="mini" icon="el-icon-upload2">导入</el-button>
                    <el-button type="default" size="mini" icon="el-icon-download">导出</el-button>
                    <el-button type="default" size="mini" icon="el-icon-refresh">刷新</el-button>
                </el-form>
		    </div>
		    <div class="table">
                <el-table :data="tableData5" border style="width: 100%" size="mini">
                    <el-table-column type="selection" align="center" ></el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="table-expand">
                                <el-form-item label="跳转URL">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="代码">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="极光类型">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="图标">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="格式">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="JSON跳转样例">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="JSON样例">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="APP页面">
                    </el-table-column>
                    <el-table-column label="名称">
                    </el-table-column>
                    <el-table-column label="标题" >
                    </el-table-column>
                    <el-table-column label="是否有效" sortable>
                    </el-table-column>
                    <el-table-column label="创建时间" sortable>
                    </el-table-column>
                    <el-table-column label="创建人">
                    </el-table-column>
                    <el-table-column label="更新时间" sortable>
                    </el-table-column>
                    <el-table-column label="修改人">
                    </el-table-column>
                    <el-table-column label="是否删除" sortable>
                    </el-table-column>
                    <el-table-column label="删除时间" sortable>
                    </el-table-column>
                    <el-table-column label="删除人">
                    </el-table-column>
                    <el-table-column label="操作" width="230" align="center">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="handleDelete(scope.$index, scope.row)"icon="el-icon-view">查看</el-button>
                            <el-button type="default" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" title>编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
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
					width 50%
</style>