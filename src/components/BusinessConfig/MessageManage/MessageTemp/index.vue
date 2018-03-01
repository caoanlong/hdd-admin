<template>
	<div class="main-content">
		<el-card class="box-card">
		    <div slot="header" class="clearfix">
		        <span>消息模板列表</span>
		    </div>
		    <div class="tableControl">
                <el-form :inline="true"  class="form-inline">
                    <el-button type="default" size="mini" icon="el-icon-plus" @click="addMessagetemplate">添加</el-button>
                    <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
                    <upload-excel btnType="default" btnTxt="导入" @on-selected-file="onSelectedFile"/>
				    <el-button type="default" size="mini" icon="el-icon-download" :loading="downloadLoading" @click.native="exportExcel">导出</el-button>
                    <el-button type="default" size="mini" icon="el-icon-refresh" :loading="refreshing" @click.native="refresh">刷新</el-button>
                </el-form>
		    </div>
		    <div class="table">
                <el-table :data="messagetemplates" @selection-change="selectionChange" border style="width: 100%" size="mini">
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column label="APP页面" prop="AppPage.Name"></el-table-column>
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
                    <!-- <el-table-column label="创建人" prop="createBy.Name" width="80"></el-table-column> -->
                    <el-table-column label="操作" width="230" align="center">
                        <template slot-scope="scope">
                            <el-button type="default" size="mini" @click="viewMessagetemplate(scope.row.MessageTemplate_ID)" icon="el-icon-view">查看</el-button>
                            <el-button type="default" size="mini" icon="el-icon-edit" @click="editMessagetemplate(scope.row.MessageTemplate_ID)">编辑</el-button>
                            <el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.MessageTemplate_ID)">删除</el-button>
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
    import UploadExcel from '../../../CommonComponents/UploadExcel'
    const userMap = {
        'APP页面':'AppPage_ID',
        '跳转URL':'ForwardURL',
        '代码':'Code',
        '名称':'Name',
        '标题':'Title',
        '格式':'Content',
        '是否有效':'IsEnable',
        '极光类型':'PushType',
        '创建时间':'CreateTime',
    }
	export default {
	    data() {
	        return {
                filename: '消息模板',
                downloadLoading: false,
                refreshing: false,
                pageIndex: 1,
                pageSize: 10,
                count: 0,
                messagetemplates: [],
                selectedMessagetemplates: []
	        }
	  	},
        created() {
            this.getMessagetemplates()
        },
		methods: {
            exportExcel() {
                this.downloadLoading = true
                import('../../../../common/Export2Excel').then(excel => {
                    const tHeader = ['APP页面','跳转URL','代码','名称','标题','格式','是否有效','极光类型','创建时间']
                    const filterVal = [userMap['APP页面'], userMap['跳转URL'], userMap['代码'], userMap['名称'], userMap['标题'], userMap['格式'], userMap['是否有效'], userMap['极光类型'], userMap['创建时间']]
                    const data = this.formatJson(filterVal, this.messagetemplates)
                    excel.export_json_to_excel(tHeader, data, this.filename)
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            },
            onSelectedFile(result) {
                new Promise((resolve, reject) => {
                    let uploadExcelMessagetemplates = []
                    result.forEach(item => {
                        let excelMessagetemplate = {}
                        for (let key in item) {
                            excelMessagetemplate[userMap[key]] = item[key]
                        }
                        uploadExcelMessagetemplates.push(excelMessagetemplate)
                    })
                    resolve(uploadExcelMessagetemplates)
                }).then(messagetemplates => {
                    this.addMutiple(messagetemplates)
                })
            },
            addUserMutiple(messagetemplates) {
                let data = {
                    messagetemplates: messagetemplates,
                }
                request({
                    url: '/set_messagetemplate/addmutip',
                    method: 'post',
                    data
                }).then(res => {
                    if (res.data.code == 0) {
                        // console.log(res.data)
                        Message.success(res.data.msg)
                        this.getMessagetemplates(1)
                    } else {
                        Message.error(res.data.msg)
                    }
                })
            },
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
			viewMessagetemplate(id) {
                this.$router.push({ name: 'viewmessagetemp', query: { MessageTemplate_ID: id} })
            },
            editMessagetemplate(id) {
                this.$router.push({ name: 'editmessagetemp', query: { MessageTemplate_ID: id} })
            },
            addMessagetemplate() {
                this.$router.push({ name: 'addmessagetemp'})
            },
            deleteConfirm(id) {
                let ids = []
                if (id && (typeof id == 'string' || typeof id == 'number')) {
                    ids = [].concat(id)
                } else {
                    if (this.selectedMessagetemplates.length == 0) {
                        this.$message({
                            type: 'info',
                            message: '未选择'
                        })
                        return
                    }
                    ids = this.selectedMessagetemplates
                }
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delMessagetemplates(ids)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            delMessagetemplates(ids) {
                let data = {
                    ids: ids
                }
                request({
                    url: '/set_messagetemplate/delete',
                    method: 'post',
                    data
                }).then(res => {
                    if (res.data.code == 0) {
                        this.getMessagetemplates()
                    } else {
                        Message.error(res.data.msg)
                    }
                })
            },
            selectionChange(data) {
                this.selectedMessagetemplates = data.map(item => item.MessageTemplate_ID)
            },
        },
        components: {
            UploadExcel
        }
	}
</script>
<style lang="stylus" scoped>
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