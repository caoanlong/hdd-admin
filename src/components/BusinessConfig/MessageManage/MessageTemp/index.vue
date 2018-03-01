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
                <el-table :data="messagetemplates" border style="width: 100%" size="mini">
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column label="APP页面" prop="AppPage_ID"></el-table-column>
                    <el-table-column label="跳转URL" prop="ForwardURL" width="70"></el-table-column>
                    <el-table-column label="代码" prop="Code"></el-table-column>
                    <el-table-column label="名称" prop="Name"></el-table-column>
                    <el-table-column label="标题" prop="Title" align="center" width="90"></el-table-column>
                    <el-table-column label="格式" prop="Content"></el-table-column>
                    <el-table-column label="是否有效" align="center" width="70">
                        <template slot-scope="scope">
                            <span>{{scope.row.IsEnable == 'Y' ? '是' : '否'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="极光类型" prop="PushType" align="center" width="70"></el-table-column>
                    <el-table-column label="创建时间" prop="CreateTime">
                        <template slot-scope="scope">
                            <span>{{new Date(scope.row.CreateTime).getTime() | getdatefromtimestamp()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建人" prop="createBy.Name" width="80"></el-table-column>
                    <el-table-column label="操作" width="230" align="center">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-view">查看</el-button>
                            <el-button type="default" size="mini" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" title>编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
                </div>
		    </div>
		</el-card>
	</div>
</template>
<script type="text/javascript">
    import request from '../../../../common/request'
    import { Message } from 'element-ui'
	export default {
	    data() {
	        return {
                refreshing: false,
                pageIndex: 1,
                pageSize: 10,
                count: 0,
                messagetemplates: []
	        }
	  	},
        created() {
            this.getMessagetemplates()
        },
		methods: {
            getMessagetemplates(pageIndex) {
                let params = {
                    pageIndex: pageIndex || 1,
                    pageSize: this.pageSize
                }
                request({
                    url: '/set_messagetemplate/list',
                    method: 'get',
                    params
                }).then(res => {
                    if (res.data.code == 0) {
                        this.count = res.data.data.count
                        this.messagetemplates = res.data.data.rows
                    } else {
                        Message.error(res.data.msg)
                    }
                })
            },
            pageChange(index) {
                this.getMessagetemplates(index)
            },
            refresh() {
                this.refreshing = true
                this.getMessagetemplates()
                setTimeout(() => {
                    this.refreshing = false
                }, 500)
            },
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