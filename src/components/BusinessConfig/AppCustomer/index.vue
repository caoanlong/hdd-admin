<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">App客户列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="关键字">
						<el-input placeholder="请输入关键字" v-model="findKeyword"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="tableData" @selection-change="selectionChange" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="App客户ID" align="center"></el-table-column>
					<el-table-column label="客户名称" align="center"></el-table-column>
					<el-table-column label="修改人" align="center" width="120"></el-table-column>
					<el-table-column label="修改时间" align="center" width="140">
						<template slot-scope="scope">
							<!-- <span>{{ new Date(scope.row.UpdateTime).getTime() | getdatefromtimestamp() }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="操作" width="90" align="center">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row.User_ID)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<Page :total="total" :pageIndex="pageIndex" :pageSize="pageSize" @pageChange="pageChange" @pageSizeChange="pageSizeChange"/>
			</div>
		</el-card>
		<el-dialog title="添加App客户" :visible.sync="addCustomerDialog">
			<el-form  label-width="100px">
				<el-form-item label="App客户ID">
					<el-input placeholder="请输入App客户ID"></el-input>
				</el-form-item>
				<el-form-item label="客户名称">
					<el-input placeholder="请输入客户名称"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="text-center">
				<el-button @click="addCustomerDialog = false">取消</el-button>
				<el-button type="primary" @click="save">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
import requestJava from '../../../common/requestJava'
import { Message } from 'element-ui'
import Page from '../../CommonComponents/Page'
export default {
	data() {
      	return {
      		findKeyword:'',
      		tableData:[],
      		pageIndex: 1,
			pageSize: 10,
			total: 0,
			selectedCustomers:[],
			addCustomerDialog:false
		}
    },
	created() {
		this.getList()
	},
    methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		pageSizeChange(size) {
			this.pageSize = size
			this.getList() 
		},
		reset() {
			this.findKeyword = ''
			this.pageIndex = 1
			this.pageSize = 10
			this.getList()
		},
		getList() {
			requestJava({
				url: '/setAppPage/configuration/list',
				method: 'get'
			}).then(res => {
				if (res.data.code == 200) {
					this.tableData = res.data.data
				} else {
					Message.error(res.data.message)
				}
			})
		},
		add() {
			this.addCustomerDialog = true
		},
		save(){

		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedCustomers.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedCustomers
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delItem(ids)
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
		delItem(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/sys_user/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		selectionChange(data) {
			this.selectedCustomers = data.map(item => item.User_ID)
		}
	},
	components: { Page }
}
</script>
<style lang="stylus" scoped>
	
</style>